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
app.use(bodyParser.urlencoded({ extended: true })); // Set extended option explicitly
app.use(bodyParser.json());
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
    const originalName = path.parse(file.originalname).name; // Extract the file name without extension
    const extension = path.extname(file.originalname); // Extract the file extension
    const timestamp = Date.now(); // Get the current timestamp

    // Rename file to: original name + timestamp + extension
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
function sendEmail({ email, name, contact, AppDesc, AppName }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mail_configs = {
      from: "sarthakshelke044@gmail.com",
      to: email,
      subject:"Nexura",
      html: `<p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
     <strong>Your form has been submitted successfully!</strong> Please ensure that all details are accurate.  
      </p>
      <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
        Your app will be live on our website within <strong>2-3 business working days</strong>. 
      <br>Thank you for choosing <strong>Nexura</strong>.
      </p>
      <hr style="border: none; border-top: 1px solid #ccc;">
        <h3 style="font-family: Arial, sans-serif; font-size: 18px; color: #555;">Important Payment Information:</h3>
      <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
        To ensure your app goes live as planned, please complete the payment process. You can use the following details for the transaction:
        </p>
          <ul style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
            <li><strong>Amount:</strong> [21.00 INR]</li>
            <li><strong>Payment Method:</strong> [UPI]</li>
              <li><strong>Click On the link to pay:</strong>https://razorpay.me/@nexura?amount=c9yvgMVo3UALiywjEnuNsQ%3D%3D</li>
            </ul>
              <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
              After completing the payment, attach the screenshot of payment and  please notify us at <strong>[nexura.com@gmail.com]</strong> to avoid any delays.
              </p>
          <hr style="border: none; border-top: 1px solid #ccc;">
          <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
          We will inform you once your app is successfully uploaded.
            </p>
            <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
             <strong>Thank you for your trust in Nexura!</strong>
              </p>
              <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
              Best regards,  
              <br><strong>The Nexura Team</strong>  
                      </p>
              `,
    };

    const mail_configs_admin = {
      from:"sarthakshelke044@gmail.com",
      to:"nexura.com@gmail.com",
      subject:"New Form Submission From Nexuraa!",
      html:`<p><p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
      <strong>Dear Admin,</strong><br><br>
      A new form has been successfully submitted on the Nexura website. Please review the details below:
    </p>
    <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333; text-align:justify;">
      <strong>Client Information:</strong>
    </p>
    <ul style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
      <li><strong>Client Name:</strong> ${name}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Phone Number:</strong> ${contact}</li>
      <li><strong>App Details:</strong> <br>App Name :${AppName}<br>App Description :${AppDesc}</li>
    </ul>
    
    <hr style="border: none; border-top: 1px solid #ccc;">
    <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
      Thank you for your prompt attention to this matter.
    </p>
    <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
      Best regards,<br><strong>The Nexura Team</strong>
    </p>`,
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `Welcome to Backend ` });
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

  if(!req.file){
    return res.status(400).send('No file uploaded.');
  }
  const folderPath = path.join(__dirname, 'uploads');
  
  fs.readdir(folderPath, (err, files) => {
      if (err) {
          return res.status(500).send('Unable to scan the folder.');
      }

      let htmlContent = `
          <html>
          <head>
              <title>Uploaded Files</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f4;
                      text-align:center;
                      padding: 20px;
                  }
                  h2 {
                      color: #333;
                      margin-bottom: 30px;
                  }
                  .container {
                      display: grid;
                      grid-template-columns: repeat(3, 1fr);
                      gap: 20px;
                      max-width: 1200px;
                      margin: 0 auto;
                      padding: 20px;
                  }
                  .file-item {
                      background: #fff;
                      padding: 20px;
                      border-radius: 10px;
                      box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);
                      transition: transform 0.3s, box-shadow 0.3s;
                      text-align: left;
                      display: flex;
                      flex-direction: column;
                      align-items: left;
                  }
                  .file-item:hover {
                    background-color: #f4f4f4;
                      box-shadow: 0 0px 5px rgba(0, 0, 0, 0.15);
                      cursor:pointer;
                  }
                  .file-info {
                      font-size: 18px;
                      color: #555;
                      margin: 5px 0;
                  }
                  .file-media {
                      margin-top: 10px;
                      display: flex;
                      flex-direction: column;
                      align-items: left;
                  }
                  img {
                      width: 100px;
                      height: 100px;
                      object-fit: cover;
                      border-radius: 8px;
                      margin-bottom: 10px;
                  }
                  .download-btn {
                      padding: 10px 15px;
                      font-size: 14px;
                      font-weight: bold;
                      color: white;
                      background-color: #007BFF;
                      border: none;
                      border-radius: 5px;
                      cursor: pointer;
                      text-decoration: none;
                      transition: background-color 0.3s;
                      margin-top: 10px;
                  }
                  .download-btn:hover {
                      background-color: #0056b3;
                  }
                  .delete-btn {
                      padding: 8px 12px;
                      font-size: 14px;
                      font-weight: bold;
                      color: white;
                      background-color: red;
                      border: none;
                      border-radius: 5px;
                      cursor: pointer;
                      text-decoration: none;
                      margin-top: 10px;
                      margin-right: 250px;
                  }
                  .delete-btn:hover {
                      background-color: darkred;
                  }
                  @media (max-width: 768px) {
                      .container {
                          grid-template-columns: repeat(2, 1fr);
                      }
                  }
                  @media (max-width: 480px) {
                      .container {
                          grid-template-columns: 1fr;
                      }
                  }
              </style>
          </head>
          <body>
              <h2>Uploaded Files</h2>
              <div class="container">
      `;

      files.forEach((file, index) => {
          const fileUrl = `/uploads/${file}`;
          const fileStat = fs.statSync(path.join(folderPath, file));
          const uploadTime = new Date(fileStat.mtime).toLocaleString();  // Get last modified time
          const fileSize = (fileStat.size / 1024).toFixed(2);  // File size in KB

          const fileId = new Date().getTime() + index; // Unique ID using timestamp

          htmlContent += `<div class="file-item" id="file-${fileId}">
              <strong>File ID:</strong> ${fileId} <br/>
              <span class="file-info">File Name: ${file}</span><br/>
              <span class="file-info">Last Updated: ${uploadTime}</span><br/>
              <span class="file-info">File Size: ${fileSize} KB</span><br/>
              <div class="file-media">`;

          // Display both image and APK file in the same div
          if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
              htmlContent += `<img src="${fileUrl}" alt="${file}"/>`;
          }
          if (file.match(/\.apk$/i)) {
              htmlContent += `<a href="${fileUrl}" download class="download-btn">Download APK</a>`;
          }

          // Add delete button for the file
          htmlContent += `
              <form method="POST" action="/delete/${file}">
                  <button type="submit" class="delete-btn">Delete File</button>
              </form>
          </div></div>`;
      });

      htmlContent += `</div></body></html>`;

      res.send(htmlContent);
  });
  res.send(`File ${req.file.filename} uploaded successfully.`);
});

// Endpoint to handle file deletion
app.post('/delete/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', fileName);

  // Delete the file
  fs.unlink(filePath, (err) => {
      if (err) {
          return res.status(500).send('Failed to delete the file.');
      }

      // After deletion, redirect to the upload page to reflect the changes
      res.redirect('/uploads');
  });
});






app.get("/", (req, res) => {
  sendEmail(req.query)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
