const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

// CORS middleware'i ekle
app.use(
  cors({
    origin: ["https://muruvvet-goettingen.web.app", "http://localhost:4200"],
  })
);

// JSON verilerini alabilmek için middleware
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/hello", (req, res) => {
  res.send("Hello, Aziz from Vercel!!!");
});

// Mail gönderme işlevini yazalım
const sendEmail = async (sender, subject, textContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "muruvvet.goettingen@gmail.com",
      pass: "qscu dyxn eolg khfg",
    },
  });

  const mailOptions = {
    from: sender,
    to: "muruvvet.goettingen@gmail.com",
    subject: subject,
    text: `From: ${sender}\n\n${textContent}`,
    replyTo: sender,
  };

  return transporter.sendMail(mailOptions);
};

// Angular'dan gelen isteği alarak e-posta gönderecek endpoint
app.post("/send-email", async (req, res) => {
  const { sender, subject, textContent } = req.body;

  if (!sender || !subject || !textContent) {
    return res.status(400).json({
      error: "Missing required fields",
      missing: {
        sender: !sender,
        subject: !subject,
        textContent: !textContent,
      },
    });
  }

  try {
    await sendEmail(sender, subject, textContent);
    console.log("Email sent successfully!");
    res.json({ message: "Email has been sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "Email sending failed", details: error.toString() });
  }
});

// Vercel uyumu için module export
module.exports = (req, res) => {
  app(req, res); // Vercel'in beklediği şekilde export
};

app.listen(port, () => {
  console.log(port);
});
