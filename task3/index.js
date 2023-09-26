const express = require("express");
const app = express();
const fs = require(fs);
const port = process.env.PORT || 8080;
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

app.post("/users", (req, res) => {
  res.send("POST request to the homepage");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
