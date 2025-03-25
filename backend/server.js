require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.PASSWORD // Your email app password (not your real password)
    }
});

// Handle form submission
app.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email, // User's email
        to: process.env.RECEIVER_EMAIL, // Your email where you want to receive messages
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Email sending failed" });
        }
        res.json({ message: "Email sent successfully!" });
    });
});

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
