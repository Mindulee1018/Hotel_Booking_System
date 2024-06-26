const { default: mongoose } = require('mongoose');
const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../Utils/email');
const Notification = require('../Models/MultipleLoginFailModel');
const crypto = require('crypto');
const cron = require('node-cron');


const failedLoginAttempts = {};

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const sendAdminNotification = async (message) => {
  await Notification.create({ message });
};


//login controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (failedLoginAttempts[email] >= 4) {
    // Send an email notification to the admin if the account is locked
    await sendAdminNotification(`Multiple failed logins for email: ${email}`);

    //email to user
    const subject = 'Account Locked';
    const text = `The account associated with email ${email} has been locked due to multiple failed login attempts.\n\n`
      + `Please use forgot password option to reset your password Quickly\n\n`;

    await sendEmail(email, subject, text);

    return res.status(403).json({ error: 'Account locked due to multiple failed login attempts.' });
  }

  try {
    const user = await User.login(email, password);

    if (!user.verified) {
      if (Date.now() > user.hashtokenexpires) {
        if (user.verificationAttempts < 2) { 
          const newToken = generateVerificationToken();
          user.hashtoken = crypto.createHash('sha256').update(newToken).digest('hex');
          user.hashtokenexpires = new Date(Date.now() + 600000); 
          user.verificationAttempts += 1; 
          await user.save(); 
    
          const subject = 'Email Verification Required';
          const text = `Your email verification link has expired.\n\n`
            + `Please click the link below to verify your email:\n\n`
            + `http://localhost:4000/user/verify-email/${newToken}\n\n`
            + `This link will expire in 10 minutes.`;
    
          await sendEmail(email, subject, text); // Send new verification email
    
          return res.status(401).json({ error: 'Account not verified. New verification email sent.' });
        } else {
          await User.findOneAndDelete({ email }); 
          return res.status(429).json({ error: 'Verification attempt limit reached. Create a new account.' });
        }
      } else {
        return res.status(401).json({ error: 'Account not verified. Please check your email for the verification link.' });
      }
    }
    

    // Reset failed login attempts upon successful login
    failedLoginAttempts[email] = 0;

    // Determine the user's role
    const role = determineRole(email);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, role });
  } catch (error) {
    if (error.message.includes("Incorrect")) {
      // Increment failed login attempts upon incorrect password
      failedLoginAttempts[email] = (failedLoginAttempts[email] || 0) + 1;

      if (failedLoginAttempts[email] >= 4) {
        // Notify admin and send email if there are multiple failed attempts
        await sendAdminNotification(`Multiple failed login attempts for email: ${email}`);
        //email to user
        const subject = 'Account Locked';
        const text = `The account associated with email ${email} has been locked due to multiple failed login attempts.\n\n`
          + `Please use forgot password option to reset your password Quickly\n\n`;

        await sendEmail(email, subject, text);
      }
    }

    res.status(400).json({ error: error.message });
  }
};

const determineRole = (email) => {
  if (email.includes('admin')) {
    return 'admin';
  } else if (email.includes('manager')) {
    return 'manager';
  } else if (email.includes('staff')) {
    return 'staff';
  } else {
    return 'user';
  }
};

module.exports = {
  loginUser,
};


const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, name, role, isAdminCreation ,verified} = req.body

  try {
    const user = await User.signup(email, password, name, role, isAdminCreation,verified)

    //create verify token
    const verifytoken = generateVerificationToken();
    console.log(verifytoken)
    user.hashtoken = verifytoken;
    user.hashtokenexpires = new Date(Date.now() +  3600000);  // 1-hour expiration
    await user.save();
  
    const subject = 'Please Verify Your Email Address';
    const text = 'Thank you for signing up with Sunset Araliya! To complete your registration, we just need you to verify your email address. This helps us ensure the security of your account and provides a smoother experience for you during your stay.\n\n'
      + `Please click the link below to verify your email::\n\n`
      + `http://localhost:4000/user/verify-email/${verifytoken}\n\n`
      + `This link will expire in 1 hour`;

      await sendEmail(email,subject,text)
      

     // create a token
     const token = createToken(user._id)

    res.status(200).json({ email, token:token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


const verifyEmail = async (req, res) => {
  const { verifytoken } = req.params;

  try {
    // Find the user by the verification token
    const user = await User.findOne({
      hashtoken: verifytoken,
      hashtokenexpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Mark the user's email as verified
    user.verified = true;
    user.hashtoken = null;
    user.hashtokenexpires = null;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while verifying the email' });
  }
};



//delete user
const deleteuser = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    // Find and delete the user by email
    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ error: 'No such user' });
    }

    return res.status(200).json({ status: 'User deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const bcrypt = require('bcrypt');

//update password
const Updateuserpwd = async (req, res) => {
  const { email } = req.params;

  // Check if the email is provided
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const { password, newpassword } = req.body;

  // Check if the current password and new password are empty
  if (!password || !newpassword) {
    return res.status(400).json({ error: 'Current password and new password are required' });
  }

  try {
    // Retrieve the existing user from the database by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'No such user' });
    }

    // Compare the existing password with the password entered by the user
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Incorrect current password' });
    }

    // Check if the new password meets the length requirement
    if (newpassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters long' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newpassword, salt);

    // Update the user's password in the database
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hash },
      { new: true }
    );

    return res.status(200).json({ status: 'User password updated', user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



const forgotpwd = async (req, res) => {

  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: 'No such user' });
  }

  try {
    const resettoken = crypto.randomBytes(32).toString('hex');//create random token
    //hash
    user.hashtoken = crypto.createHash('sha256').update(resettoken).digest('hex');

    user.hashtokenexpires = Date.now() + 600000;
    await user.save()


    const subject = 'Password Reset';
    const text = 'You are receiving this email because you (or someone else) have requested to reset the password for your account.\n\n'
      + `Please click on the following link, or paste it into your browser to complete the process:\n\n`
      + `http://localhost:3000/user/resetPassword/${resettoken}\n\n`
      + `If you did not request this, please ignore this email and your password will remain unchanged.`;



    await sendEmail(email, subject, text);
    res.status(200).json({ status: 'Password reset link sent to your email' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }


}


const resetpwd = async (req, res) => {
  const token = crypto.createHash('sha256').update(req.params.token).digest('hex')//hash reset token comming from parameter to match with db

  const user = await User.findOne({ hashtoken: token, hashtokenexpires: { $gt: Date.now() } })

  try {
    if (!user) {

      return res.status(400).json({ error: 'Incorrect token or invalid' });
    }

    const { password, repassword } = req.body;

    // Check if the current password and new password are empty
    if (!password || !repassword) {
      return res.status(400).json({ error: 'Both passwords are required' });
    }



    // Check if the new password meets the length requirement
    if (password.length < 8) {
      return res.status(400).json({ error: 'password must be at least 8 characters long' });
    }

    if (password !== repassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const updatedUser = await User.findOneAndUpdate(
      {
        hashtoken: token,
        hashtokenexpires: { $gt: Date.now() }, // check still valid
      },
      {
        password: hash,
        hashtoken: null,
        hashtokenexpires: null,
      },
      { new: true } // Return the updated user
    );

    failedLoginAttempts[user.email] = 0;
    return res.status(200).json({ status: 'User password updated' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

}






//get managers
const getmanagers = async (req, res) => {
  try {
    const selectedFields = ['name', 'email', 'role'];
    const staffMembers = await User.find({ role: 'manager' }).select(selectedFields);

    if (staffMembers.length === 0) {
      return res.status(404).json({ message: 'No manager members found' });
    }

    res.status(200).json(staffMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getstaff = async (req, res) => {
  try {
    const selectedFields = ['name', 'email', 'role'];
    const staffMembers = await User.find({ role: 'staff' }).select(selectedFields);

    if (staffMembers.length === 0) {
      return res.status(404).json({ message: 'No staff members found' });
    }

    res.status(200).json(staffMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getusers = async (req, res) => {
  try {
    const selectedFields = ['name', 'email','verified'];
    const userMembers = await User.find({ role: 'user' }).select(selectedFields);

    if (userMembers.length === 0) {
      return res.status(404).json({ message: 'No members found' });
    }

    res.status(200).json(userMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};





//get single user
const getsingleuser = async (req, res) => {

  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'invalid id' })
  }

  const user = await User.findById(id)

  if (!user) {
    res.status(404).json({ error: 'No such user' })
  }

  res.status(200).json(user)
}


const generateReport = async (req, res) => {
  try {
    // Count total number of users
    const totalUsers = await User.countDocuments();

    // Group users by role
    const roleDistribution = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);

    // Count verified and unverified users
    const verifiedUsers = await User.countDocuments({ verified: true });
    const unverifiedUsers = await User.countDocuments({ verified: false });

    // Constructing the report object
    const report = {
      totalUsers,
      verifiedUsers,
      unverifiedUsers,
      roleDistribution
    };

    // Sending the report as JSON response
    res.status(200).json(report);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getNewAccountsWithinOneMonth = async (req, res) => {
  try {
    // Calculate the date one month ago from today
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  
    const newUsers = await User.find({
      createdAt: { $gte: oneMonthAgo },
      role: 'user'
    }).select('email verified');

  
    const newAccountsCount = newUsers.length;

    const response = {
      count: newAccountsCount,
      users: newUsers.map(user => ({
        email: user.email,
        verified: user.verified
      }))
    };

   
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching new user accounts:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




module.exports = { signupUser,verifyEmail, loginUser, getmanagers, getusers, getstaff, getsingleuser, deleteuser, Updateuserpwd, forgotpwd, resetpwd,generateReport,getNewAccountsWithinOneMonth}