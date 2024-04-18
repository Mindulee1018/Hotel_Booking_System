const { default: mongoose } = require('mongoose')
const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { sendEmail } = require('../Utils/email');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Determine the user's role
    const role = determineRole(email);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const determineRole = (email) => {
  // login based on the email
  if (email.includes('admin')) {
    return 'admin';
  } else if (email.includes('manager')) {
    return 'manager';
  } else if (email.includes('staff')) {
    return 'staff';
  }else{
    return 'user'
  }
};

// signup a user
const signupUser = async (req, res) => {
  const {email, password,name,role,isAdminCreation} = req.body

  try {
    const user = await User.signup(email, password,name,role,isAdminCreation)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}




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







const forgotpwd = async (req,res)=>{

  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: 'No such user' });
  }

  try{
  const resettoken = crypto.randomBytes(32).toString('hex');//create random token
  //hash
  user.hashtoken= crypto.createHash('sha256').update(resettoken).digest('hex');
 
  user.hashtokenexpires =  Date.now() + 600000; 
  await user.save()
 

   const subject= 'Password Reset';
   const text= 'You are receiving this email because you (or someone else) have requested to reset the password for your account.\n\n'
    + `Please click on the following link, or paste it into your browser to complete the process:\n\n`
    + `http://localhost:3000/user/resetPassword/${resettoken}\n\n`
    + `If you did not request this, please ignore this email and your password will remain unchanged.`;
  
  
  
    await sendEmail(email,subject,text);
    res.status(200).json({ status: 'Password reset link sent to your email' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }

  
}


const resetpwd = async (req,res)=>{
  const token = crypto.createHash('sha256').update(req.params.token).digest('hex')//hash reset token comming from parameter to match with db
  
  const user= await User.findOne({hashtoken:token,hashtokenexpires: { $gt: Date.now() }})
 
try{
  if(!user){
   
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
 
    return res.status(200).json({ status: 'User password updated'});
  }catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

  }






  //get managers
const getmanagers = async (req,res) =>{
  try {
      const selectedFields = ['name' ,'email', 'role'];
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
  
  const getstaff = async (req,res) =>{
    try {
        const selectedFields = ['name' ,'email', 'role'];
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
  
  
    const getusers = async (req,res) =>{
      try {
          const selectedFields = ['name' ,'email'];
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
  const getsingleuser = async (req,res) =>{
  
    const {id} = req.params
  
    if(!mongoose.Types.ObjectId.isValid(id)){
      res.status(404).json({error: 'invalid id'})
    }
  
    const user = await User.findById(id)
  
    if(!user){
      res.status(404).json({error: 'No such user'})
    }
  
    res.status(200).json(user)
  }
  


module.exports = { signupUser, loginUser, getmanagers ,getusers ,  getstaff, getsingleuser, deleteuser, Updateuserpwd, forgotpwd, resetpwd}