const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: process.env.EmailHost,
      // port: process.env.EmailPort,
      service:'gmail',
      auth: {
        // user: process.env.EmailUser,
        user: 'aliasantiago03@gmail.com',
        // pass: process.env.EmailPassword,
        pass: 'llfl ernf lnzq lsth '
      },
    });

    const mailOptions = {
      from: "aliasantiago03@gmail.com'",
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
};

module.exports = { sendEmail };
