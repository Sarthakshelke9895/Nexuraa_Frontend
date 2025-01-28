const express = require('express'); 
const nodemailer = require("nodemailer");
const multer = require("multer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Define MongoDB Schema
const submissionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  apkFile: { type: String, required: true },
  image: { type: String, required: true },
});
const Submission = mongoose.model("Submission", submissionSchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure "uploads" folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  },
});
const upload = multer({ storage });

// Route for handling form submission
app.post("/submit-form", upload.fields([{ name: "apkFile" }, { name: "image" }]), async (req, res) => {
  try {
    const { email } = req.body;
    const apkFile = req.files.apkFile[0].filename;
    const image = req.files.image[0].filename;

    // Save to database
    const newSubmission = new Submission({ email, apkFile, image });
    await newSubmission.save();

    // Send confirmation email
    await sendEmail(req.body);

    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit the form." });
  }
});

// Send Email Function
async function sendEmail({ email, name, contact, AppDesc, AppName }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mail_configs = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Nexura",
      html: `<p>Your form has been submitted successfully!</p><p>App will be live within 2-3 business working days.</p>`,
    };

    const mail_configs_admin = {
      from: process.env.MAIL_USER,
      to: "nexura.com@gmail.com",
      subject: "New Form Submission From Nexuraa!",
      html: `<p>A new form has been successfully submitted. Please review the details below:</p><ul><li>Client Name: ${name}</li><li>Email: ${email}</li><li>Phone: ${contact}</li><li>App Name: ${AppName}</li><li>App Description: ${AppDesc}</li></ul>`,
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      transporter.sendMail(mail_configs_admin, function (error2, info2) {
        if (error2) {
          console.log(error2);
          return reject({ message: `An error has occurred` });
        }
        return resolve({ message: "Emails sent successfully" });
      });
    });
  });
}

// Route to access the uploads folder and display files
app.get('/uploads', (req, res) => {
    const folderPath = path.join(__dirname, 'uploads');
    
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan the folder.');
        }

        let htmlContent = '<h2>Uploaded Files:</h2><ul>';

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            const fileUrl = `/uploads/${file}`;

            // Check if the file is an image or APK
            if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
                // Display image
                htmlContent += `<li><img src="${fileUrl}" alt="${file}" style="width:200px; height:auto;" /></li>`;
            } else if (file.match(/\.apk$/i)) {
                // Display link for APK file
                htmlContent += `<li><a href="${fileUrl}" download>${file} (APK)</a></li>`;
            }
        });

        htmlContent += '</ul>';
        res.send(htmlContent);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
