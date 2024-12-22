const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());

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
      html: `
      <p>Your form has been submitted successfully.Please ensure that every details are correct.<br></br>Your App will be  live on website in 2-3 bussiness working days.
      </br> Thank you for choosing the Nexura.<br></br>We Will Inform you once our App is Uploaded. </p>
      <p>Best Regards</p>
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
