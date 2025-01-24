const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const port = 3000;


const app = express();
const mongoose = require("mongoose");
app.use(express.json());

app.use(cors());
app.use("/files", express.static("files"));
//mongodb connection----------------------------------------------
const mongoUrl =
"mongodb+srv://sarthakshelke044:XcZyfsc6y1OfrHT0@cluster0.bsrot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));
//multer------------------------------------------------------------
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

require("./pdfDetails");
const PdfSchema = mongoose.model("PdfDetails");
const upload = multer({ storage: storage });

app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  const username = req.body.name;
  const email = req.body.email;
  try {
    await PdfSchema.create({ title: title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});

//apis----------------------------------------------------------------
app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

app.listen(5000, () => {
  console.log("Server Started");
});


































var corsOptions = {
  origin: 'https://nexuraa.netlify.app/',
  methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials:true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

function sendEmail({ email,name,contact,AppDesc,AppName}) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sarthakshelke044@gmail.com",
        pass: "zxnuraqbieicgxqf",
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
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
    transporter.sendMail(mail_configs_admin, function (error2, info2) {
      if (error2) {
        console.log(error2);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  }); 
}

app.get("/", (req, res) => {
  sendEmail(req.query)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});