const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const userRoutes = require("./routes/userRoute");
const orderRoutes = require("./routes/orderRoute");
const productRoutes = require("./routes/productRoute");
const storeRoutes = require("./routes/storeRoute");

const port = process.env.PORT || 4000;

const connectDB = require("./db/mongoose.js");

connectDB();

app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);
app.use("/stores", storeRoutes),
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
