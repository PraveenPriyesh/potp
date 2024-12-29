const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;  // Dynamically use the port provided by Render

app.use(cors());
app.use(express.json());

app.post('/otp', (req, res) => {
    const { email } = req.body;
    console.log(`Received email: ${email}`);

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Generated OTP: ${otp}`);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'praveenpriyesh@gmail.com',
            pass: 'niwi usyb itea mlye', // Use your app password
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const mailOptions = {
        from: 'praveenpriyesh@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `ethan da OTP punda: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending OTP email:', error);
            return res.status(500).json({ error: 'Failed to send OTP' });
        }
        console.log('OTP email sent: ' + info.response);
        return res.status(200).json({ message: 'OTP sent successfully', otp });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
