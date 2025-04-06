const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello, Aziz from Vercel!");
});

module.exports = (req, res) => {
  app(req, res); // Vercel'in beklediği şekilde export
};
