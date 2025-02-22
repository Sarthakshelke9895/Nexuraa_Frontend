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



const uploadDir = path.join(__dirname, 'uploads');

// Check if the directory exists, and if not, create it
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // { recursive: true } to create nested directories if needed
}
const uploadPath = path.join(__dirname, 'uploads', 'SS-Dryfruits_1738157716631.apk');


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
  const folderPath = path.join(__dirname, 'uploads');
  
  fs.readdir(folderPath, (err, files) => {
      if (err) {
          return res.status(500).send('Unable to scan the folder.');
      }

      let fileList = files.map(file => {
          const filePath = path.join(folderPath, file);
          const stats = fs.statSync(filePath);
          return {
              name: file,
              size: (stats.size / 1024).toFixed(2) + ' KB', // Convert bytes to KB
              lastModified: stats.mtime.toLocaleString(),
              path: `/uploads/${file}`
          };
      });

      fileList.sort((a, b) => b.lastModified.localeCompare(a.lastModified));

      let htmlContent = `
          <html>
          <head>
              <title>Uploaded Files</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f8f9fa;
                      text-align: left;
                      padding: 20px;
                    
                      display:flex;
                      align-items:left;
                      flex-direction: column;
                  }
                  h2 {
                      color: #222;
                      margin-bottom: 30px;
                      text-align: center;
                  }
                  .container {
                      display: flex;
                      flex-direction:column;
                      gap: 20px;
                      width:700px;
                      margin: 0 auto;
                      padding: 20px;
                   

                  }
                  .file-item {
                      background: #fff;
                      padding: 15px;
                      border-radius: 10px;
                      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                      transition: transform 0.3s ease, box-shadow 0.3s ease;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      flex-wrap: wrap;
                  }
                  .file-item:hover {
                      background-color: #f4f4f4;
                      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
                      transform: translateY(-1px);
                      cursor: pointer;
                  }
                  .file-info {
                      display: flex;
                      flex-direction: column;
                  }
                  .buttons {
                      display: flex;
                      gap: 10px;
                  }
                  .download-btn, .delete-btn {
                      padding: 8px 12px;
                      font-size: 14px;
                      font-weight: bold;
                      color: white;
                      border: none;
                      border-radius: 5px;
                      cursor: pointer;
                      text-decoration: none;
                      transition: background-color 0.3s ease, transform 0.2s ease;
                  }
                  .download-btn {
                      background-color: #007BFF;
                  }
                  .download-btn:hover {
                      background-color: #0056b3;
                      transform: scale(1.02);
                  }
                  .delete-btn {
                      background-color: red;
                  }
                  .delete-btn:hover {
                      background-color: darkred;
                      transform: scale(1.05);
                  }
              </style>
              <script>
                  function deleteFile(fileName) {
                      const password = prompt("Enter password to delete:");
                      if (!password) {
                          alert("Password is required!");
                          return;
                      }
                      fetch('/delete', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ fileName, password })
                      })
                      .then(response => response.text())
                      .then(message => {
                          alert(message);
                          location.reload();
                      })
                      .catch(error => console.error('Error:', error));
                  }
              </script>
          </head>
          <body>
              <h2>Uploaded Files</h2>
              <div class="container">
      `;

      fileList.forEach((file, index) => {
          htmlContent += `<div class="file-item">
              <div class="file-info">
                  <strong>SR No:</strong> ${index + 1} <br/>
                  <strong>File Name:</strong> ${file.name} <br/>
                  <strong>Size:</strong> ${file.size} <br/>
                  <strong>Last Modified:</strong> ${file.lastModified} <br/>
              </div>
              <div class="buttons">
                  <a href="${file.path}" download class="download-btn">Download</a>
                  <button class="delete-btn" onclick="deleteFile('${file.name}')">Delete</button>
              </div>
          </div>`;
      });

      htmlContent += `</div></body></html>`;
      res.send(htmlContent);
  });
});

app.post('/delete', (req, res) => {
    const { fileName, password } = req.body;
    if (password !== 'ss') {
        return res.status(403).send("Incorrect password");
    }
    
    const filePath = path.join(__dirname, 'uploads', fileName);
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).send("Error deleting file");
        }
        res.send("File deleted successfully");
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
