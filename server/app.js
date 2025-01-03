const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 5000;



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

function sendEmail({ email }) {
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
  <li><strong>Click On the link to pay:</strong><a href ="https://razorpay.me/@nexura?amount=c9yvgMVo3UALiywjEnuNsQ%3D%3D"></a></li>
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
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
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