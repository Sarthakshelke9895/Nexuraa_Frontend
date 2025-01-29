const express = require('express'); 
const nodemailer = require("nodemailer");
const multer = require("multer");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const path = require("path");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Serve static files from uploads folder
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

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
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const originalName = path.parse(file.originalname).name;
    const extension = path.extname(file.originalname);
    const timestamp = Date.now();
    cb(null, `${originalName}_${timestamp}${extension}`);
  },
});
const upload = multer({ storage });

// Route for handling form submission
app.post("/submit-form", upload.fields([{ name: "apkFile" }, { name: "image" }]), async (req, res) => {
  try {
    const { email } = req.body;
    const apkFile = req.files.apkFile[0].filename;
    const image = req.files.image[0].filename;

    const newSubmission = new Submission({ email, apkFile, image });
    await newSubmission.save();

    await sendEmail(email);

    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (err) {
    console.error("Error in form submission:", err);
    res.status(500).json({ error: "Failed to submit the form." });
  }
});

// Send Email Function
function sendEmail(email) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Nexura - Form Submission Confirmation",
      html: `<p>Your form has been submitted successfully! Your app will be live within 2-3 business days.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return reject("Email sending failed");
      }
      console.log("Email sent:", info.response);
      resolve("Email sent successfully");
    });
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
