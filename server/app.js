const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Email sending endpoint
app.post('/send-email', upload.fields([{ name: 'apkfile' }, { name: 'applogo' }]), async (req, res) => {
    const { name, email, phone, address, appname, owner, slogan, appdesc } = req.body;
    const apkFile = req.files['apkfile']?.[0];
    const appLogo = req.files['applogo']?.[0];

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sarthakshelke044@gmail.com',
            pass: 'zxnuraqbieicgxqf', // Replace with your app password
        },
    });

    // Mail to client
    const clientMailOptions = {
        from: 'sarthakshelke044@gmail.com',
        to: email,
        subject: 'Thank you for your submission',
        text: `Hi ${name},\n\nThank you for reaching out! We have received your submission:\n\nApp Name: ${appname}\nMessage: ${appdesc}\n\nBest regards,\nYour Company`,
    };

    // Mail to admin
    const adminMailOptions = {
        from: 'sarthakshelke044@gmail.com',
        to: 'sarthakshelke044@gmail.com',
        subject: `New Form Submission from ${name}`,
        text: `Details:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nApp Name: ${appname}\nOwner: ${owner}\nSlogan: ${slogan}\nDescription: ${appdesc}`,
        attachments: [
            apkFile && { filename: apkFile.originalname, content: apkFile.buffer },
            appLogo && { filename: appLogo.originalname, content: appLogo.buffer },
        ].filter(Boolean),
    };

    try {
        await transporter.sendMail(clientMailOptions);
        await transporter.sendMail(adminMailOptions);
        res.status(200).json({ message: 'Emails sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send emails', error });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
