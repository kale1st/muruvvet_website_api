const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

const port = process.env.PORT || 3000;

app.get("/hello", (req, res) => {
  res.send("Hello, Aziz from Vercel!!!");
});

// Mail gönderme işlevini yazalım
const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "muruvvet.goettingen@gmail.com", // Kendi e-posta adresinizi girin
      pass: "qscu dyxn eolg khfg", // Gmail App Password
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com", // Gönderen e-posta
    to: "recipient-email@example.com", // Alıcı e-posta
    subject: "Test Email from Node.js",
    text: "This is a test email sent using Nodemailer and Gmail App Password in Node.js!",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

// Express route to trigger email sending
app.get("/send-email", async (req, res) => {
  await sendEmail();
  res.send("Email has been sent!");
});

// Mail gönderme işlevini yazalım
const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "muruvvet.goettingen@gmail.com", // Kendi e-posta adresinizi girin
      pass: "qscu dyxn eolg khfg", // Gmail App Password
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com", // Gönderen e-posta
    to: "recipient-email@example.com", // Alıcı e-posta
    subject: "Test Email from Node.js",
    text: "This is a test email sent using Nodemailer and Gmail App Password in Node.js!",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

// Express route to trigger email sending
app.get("/send-email", async (req, res) => {
  await sendEmail();
  res.send("Email has been sent!");
});

module.exports = (req, res) => {
  app(req, res); // Vercel'in beklediği şekilde export
};
