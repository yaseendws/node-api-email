const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer")

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors())

app.post("/api/sendEmail", (req, res) => {
    console.log(req.body, "body");
    let { subject, body,to } = req.body;
  
    
  
    if (!subject || !body) {
      res.json({
        status: "false",
      });
      return;
    }
  
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "yaseendws@gmail.com",
        pass: "bkdgubpewtnrnygj",
      },
    });
  
    const mailOptions = {
      from: "yaseendws@gmail.com",
      to: to,
      subject: subject,
      text: body,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error occurred:", error.message);
        res.json({
          message: error.message,
          status: false,
        });
      } else {
        let emailDate = new Date();
  
        res.json({
          message: "Email send successfully",
          status: true,
          info: info,
          subject: subject,
          date: emailDate,
          body: body,
        });
      }
    });
  });
  app.listen(PORT,()=>{
    console.log(`Server has started on http://localhost:${PORT}`)
})