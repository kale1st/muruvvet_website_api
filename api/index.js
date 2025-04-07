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
const sendEmail = async (recipient, subject, textContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "muruvvet.goettingen@gmail.com", // Kendi e-posta adresinizi girin
      pass: "qscu dyxn eolg khfg", // Gmail App Password
    },
  });

  const mailOptions = {
    from: "muruvvet.goettingen@gmail.com", // Gönderen e-posta
    to: recipient, // Alıcı e-posta
    subject: subject, // Dinamik konu
    text: textContent, // Dinamik içerik
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

// Angular'dan gelen isteği alarak e-posta gönderecek endpoint
app.post("/send-email", async (req, res) => {
  const { recipient, subject, textContent } = req.body;

  if (!recipient || !subject || !textContent) {
    return res
      .status(400)
      .send("Missing required fields: recipient, subject, or textContent.");
  }

  await sendEmail(recipient, subject, textContent);
  res.json({ message: mailOptions });
});

// Vercel uyumu için module export
module.exports = (req, res) => {
  app(req, res); // Vercel'in beklediği şekilde export
};
