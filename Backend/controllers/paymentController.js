const { default: mongoose } = require('mongoose')
const Payment = require("../Models/PaymentModel");
const nodemailer = require('nodemailer');

// Create payment
const createPayment = async (req, res) => {
    try {
        const payment = new Payment(req.body);
        await payment.save();
        res.status(201).send({ success: true, message: "Payment created successfully" });
    } catch (error) {
        console.error("Error creating payment:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
};

// Send email
const sendEmail = async (req, res) => {
    try {
        const { email } = req.body;
        // Create a Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'aliasantiago03@gmail.com',
                pass: 'llfl ernf lnzq lsth '
            }
        });
        // Send a thank you email
        await transporter.sendMail({
            from: 'aliasantiago03@gmail.com',
            to: email,
            subject: 'Thank You for Payment!',
            text: 'Thank you for your payment! We value your trust in our services and look forward to serving you again.If you have any questions or concerns regarding your reservation, please do not hesitate to contact us.'
        });
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Other controller functions (getUserPayment, updatePayment, deletePayment)...

module.exports = { createPayment, sendEmail, /* other controller functions */ };