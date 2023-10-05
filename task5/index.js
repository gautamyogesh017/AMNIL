const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

const connectDB = require("./db/mongoose.js");
connectDB();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
