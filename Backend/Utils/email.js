const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EmailHost,
      port: process.env.EmailPort,
      auth: {
        user: process.env.EmailUser,
        pass: process.env.EmailPassword,
      },
    });

    const mailOptions = {
      from: "support@Cd.com",
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
