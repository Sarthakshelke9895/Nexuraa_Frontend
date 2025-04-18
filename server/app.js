const express = require('express'); 
const nodemailer = require("nodemailer");
const multer = require("multer");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require("path");
const cors = require("cors");
const fs = require('fs-extra');
const simpleGit = require('simple-git');
const { exec } = require('child_process');



require("dotenv").config();
const crypto = require("crypto");




const app = express();
const port = 5000;



app.use(express.json());
app.use(cors());

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


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Create and export the model in the same file
const User = mongoose.model('User', userSchema);
module.exports = { User, userSchema };

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
          let fileSizeInMB = stats.size / (1024 * 1024); // Convert to MB

          let formattedSize =
              fileSizeInMB < 1
                    ? (stats.size / 1024).toFixed(2) + " KB"  // Show in KB if less than 1 MB
                    : fileSizeInMB.toFixed(2) + " MB"; // Show in MB otherwise
          return {
              name: file,
              size: formattedSize, // Convert bytes to MB
              lastModified: new Date(stats.mtime).toLocaleString('en-US', { 
                timeZone: 'Asia/Kolkata', // Change to your correct time zone
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: true 
            }),
              path: `/uploads/${file}`
          };
      });

      fileList.sort((a, b) => b.lastModified.localeCompare(a.lastModified));

      let htmlContent = `
          <html>
          <head>
              <title>Uploaded Files</title>
              <style>
              @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                  body {
                    font-family: "Outfit","sans-serif";
                      background-color:#ffffff;
                      
                      display:flex;
                      flex-direction: column;
                      align-items: center;


                  }
                  h2 {
                      color: #212EA0;
                      margin-bottom: 30px;
                      align-self: flex-start; 
                      margin-left:20px;
                  }
                  .container {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr); /* Always 2 columns */
                    gap: 20px;
                    width: 98%;
                    
                }
                
                /* Each file box */
                .file-item {
                    background: #fff;
                    padding: 15px;
                    border-radius: 10px;
                    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.2);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10px;
                    min-height: 80px; /* Keeps all items aligned */
                    word-wrap: break-word;
                }
                
                /* Hover effect */
                .file-item:hover {
                    background-color: #f4f4f4;
                    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                }
                
                /* File information */
                .file-info {
                    display: flex;
                    flex-direction: column;
                    flex: 1; /* Ensures it takes up available space */
                    overflow: hidden; /* Prevents text from overflowing */
                }
                
                /* File name */
                .file-info .file-name {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 100%; /* Prevents breaking layout */
                }
                
                /* Button container */
                .buttons {
                    display: flex;
                    gap: 10px;
                    flex-direction: column; /* Fixes stacking issue */
                    flex-shrink: 0; /* Prevents buttons from shrinking */
                }
                
                /* Buttons styling */
                .download-btn, .delete-btn {
                    padding: 8px 12px;
                    font-size: 14px;
                    font-weight: bold;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    text-decoration: none;
                    background-color: #007BFF; /* Blue theme */
                }
                
                /* Delete button (red) */
                .delete-btn {
                    background-color: #FF4C4C;
                }
                
                /* Responsive: 1 column layout for small screens */
                @media (max-width: 480px) {
                    .container {
                        grid-template-columns: 1fr; /* Switch to single column */
                    }
                }
                
                  .download-btn {
                      background-color: #007BFF;
                  }
                  .download-btn:hover {
                      background-color: #0056b3;
                      
                  }
                  .delete-btn {
                      background-color: red;
                  }
                  .delete-btn:hover {
                      background-color: darkred;
                      
                  }
                  .modal {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    justify-content: center;
                    align-items: center;
                    z-index: 200;
                }
                
                .modal-content {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                    width: 300px;
                    color:#212EA0;
                }
                
                .modal input {
                    width: 100%;
                    padding:10px;
                    margin-top:10px;
                    display: block;
                    background-color: #f0f0f0;
                    border-radius:4px;
                    border:0;
                    outline:0;
                }
               
                
                .modal-buttons {
                    margin-top: 15px;
                    display:flex;
                    align-items:center;
                    justify-content:flex-start;
                }
                #modalText{
                  color:black;
                  text-align:left;
                }

                
                .modal-buttons button {
                    
                    margin: 5px;
                    cursor: pointer;
                    background-color: #212EA0;
                    padding: 10px 20px;
                    border-radius: 8px;
                    color: rgb(255, 255, 255);
                   
                    border:0;
                    outline:0;
                }
                
                .modal-buttons button : hover{
                  cursor:pointer;
                  background-color:#212EU0;
                }
                #modalTitle{
                
                    text-align: left;
                    width: 100%; /* Ensures it stretches across the container */
                    color: #212EA0;
                    margin:0px;
                } 
                
                
                

                .color-dot {
                  width: 20px;
                  height:20px;
                  border-radius: 50%;
                  position: relative;
                  margin-bottom:10px;
                  
              }
                
              </style>
              <script>
              let currentAction = null;
              let currentFile = null;
              
              function openModal(action, fileName) {
                  currentAction = action;
                  currentFile = fileName;
                  document.getElementById("modalTitle").textContent = action === 'delete' ? "Delete File" : "Download File";
                  document.getElementById("modalText").textContent = action === 'delete' 
                      ? "Enter Admin password to delete the file:" 
                      : "Are you sure you want to download this file?";
                  
                  document.getElementById("modalInput").style.display = action === 'delete' ? "block" : "none";
                  document.getElementById("customModal").style.display = "flex";
              }
              
              function closeModal() {
                  document.getElementById("customModal").style.display = "none";
              }
              
              function confirmAction(fileName) {
                  if (currentAction === 'delete') {
                      const password = document.getElementById("modalInput").value;
                      if (!password) {
                          alert("Password is required!");
                          return;
                      }
                      
                      fetch('/delete', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ fileName: currentFile, password })
                      })
                      .then(response => response.text())
                      .then(message => {
                          alert(message);
                          location.reload();
                      })
                      .catch(error => console.error('Error:', error));
              
                  } 
              
                  closeModal();
              }
              
              </script>
          </head>
          <body>
              <h2>Uploaded Files:</h2>
              <div class="container">
              <!-- Modal for Password Confirmation -->
<div id="customModal" class="modal">
    <div class="modal-content">
        <h2 id="modalTitle">Confirm Action</h2>
        <p id="modalText"></p>
        <input type="password" id="modalInput" placeholder="Enter password">
        <div class="modal-buttons">
            <button onclick="confirmAction()">Confirm</button>
            <button onclick="closeModal()">Cancel</button>
        </div>
    </div>
</div>


      `;

      function getRandomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Generate a hex color
    }

    let colorMap = {}; // Store colors for each pair (without persistence)
    fileList.forEach((file, index) => {
        let pairIndex = Math.floor(index / 2); // Ensure same color for every two files

        if (!colorMap[pairIndex]) {
            colorMap[pairIndex] = getRandomColor(); // Assign a new color to each pair
        }
    });


      fileList.forEach((file, index) => {
        // Generate a unique ID for every two files (same ID for index 0 & 1, then 2 & 3, etc.)
        const uniqueId = Math.floor(index / 2) + 1000;
        let pairIndex = Math.floor(index / 2);
            const color = colorMap[pairIndex]; // Retrieve the assigned color // Generates IDs like 1000, 1001, 1002...
    
        htmlContent += `<div class="file-item">
            <div class="file-info">
            <div class="color-dot" style="background: ${color};"></div> 
                <strong>Object ID:</strong> ${uniqueId} <br/>
                <strong>File Name:</strong> ${file.name} <br/>
                <strong>Size:</strong> ${file.size} <br/>
                <strong>Uploaded Timestamp:</strong> ${file.lastModified} <br/>
            </div>
            <div class="buttons">
                <a href="${file.path}" download class="download-btn">Download</a>
                <button class="delete-btn" onclick="openModal('delete', '${file.name}')">Delete</button>
            </div>
        </div>`;
    });
    

      htmlContent += `</div></body></html>`;
      res.send(htmlContent);
  });
});

app.post('/delete', (req, res) => {
    const { fileName, password } = req.body;
    if (password !== 'Nexuraa') {
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



app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', url: '/user' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token, url: '/user' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});




const resetTokens = {}; // Use a database in production

// ✅ Forgot Password Endpoint
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    resetTokens[token] = { email, expiresAt: Date.now() + 3600000 }; // Expires in 1 hour

    console.log("Generated Token:", token);  // ✅ Debugging
    console.log("resetTokens Object:", resetTokens);  // ✅ Debugging

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sarthakshelke044@gmail.com",
        pass: "zxnuraqbieicgxqf",
      },
    });

    const mailOptions = {
      from: "sarthakshelke044@gmail.com",
      to: email,
      subject: "Reset Your Password",
      html: `
        <div>
          <h2>Password Reset Request</h2>
          <p>Click the button below to reset your password.</p>
          <a href="http://nexuraa.netlify.app/resetpassword?token=${token}" 
             style="background: blue; color: white; padding: 10px; border-radius:4px;">
             Reset Password
          </a>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Reset link sent to your email" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.post("/reset-password", async (req, res) => {
  console.log("Received request body:", req.body);

  const { token, password } = req.body;
  if (!token || !password) {
    return res.status(400).json({ message: "Token and password are required" });
  }

  console.log("Checking token:", token);
  console.log("Stored Tokens:", resetTokens);

  const email = resetTokens[token]?.email;
  if (!email) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();

  delete resetTokens[token]; // Remove token after use

  res.json({ message: "Password reset successful. You can now log in." });
});

const REPO_DIR = path.join(__dirname, "repo"); // Local directory to clone repo
const ANDROID_LOCATIONS = ["android", "app/android", "mobile/android"]; // Possible locations for android folder

app.post("/build-apk", async (req, res) => {
  const { githubRepo } = req.body;

  if (!githubRepo) {
    return res.status(400).json({ error: "GitHub repo URL is required" });
  }

  try {
    // ✅ Step 1: Remove existing repo folder if it exists
    if (fs.existsSync(REPO_DIR)) {
      console.log("🔄 Deleting existing repo...");
      fs.rmSync(REPO_DIR, { recursive: true, force: true });
    }

    // ✅ Step 2: Clone the repository
    console.log("📥 Cloning repository...");
    await simpleGit().clone(githubRepo, REPO_DIR);

    // ✅ Step 3: Debugging - Print repo structure
    console.log("📂 Repo Directory Structure:");
    console.log(fs.readdirSync(REPO_DIR).join("\n"));

    // ✅ Step 4: Locate the Android directory
    let ANDROID_DIR = null;
    for (const location of ANDROID_LOCATIONS) {
      const fullPath = path.join(REPO_DIR, location);
      if (fs.existsSync(fullPath)) {
        ANDROID_DIR = fullPath;
        break;
      }
    }

    if (!ANDROID_DIR) {
      console.error("❌ Error: 'android' directory not found in the cloned repository.");
      return res.status(500).json({ error: "'android' directory not found in the repo." });
    }

    console.log(`📂 Android directory found at: ${ANDROID_DIR}`);

    // ✅ Step 5: Set Gradle command based on OS
    const gradleCommand =
      process.platform === "win32"
        ? `cd "${ANDROID_DIR}" && gradlew.bat assembleDebug`
        : `cd "${ANDROID_DIR}" && ./gradlew assembleDebug`;

    console.log("⚙️ Building APK...");

    // ✅ Step 6: Run the Gradle build command
    exec(gradleCommand, { shell: true }, (err, stdout, stderr) => {
      if (err) {
        console.error("❌ Build failed:", stderr);
        return res.status(500).json({ error: "Build failed", details: stderr });
      }

      console.log("✅ Build successful:", stdout);

      // ✅ Step 7: Check if APK was generated
      const APK_PATH = path.join(ANDROID_DIR, "app", "build", "outputs", "apk", "debug", "app-debug.apk");
      if (!fs.existsSync(APK_PATH)) {
        console.error("❌ Build successful, but APK not found!");
        return res.status(500).json({ error: "APK not found after build." });
      }

      console.log(`📦 APK generated at: ${APK_PATH}`);
      res.json({ message: "APK built successfully!", apkPath: APK_PATH });
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Failed to build APK", details: error.message });
  }
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
