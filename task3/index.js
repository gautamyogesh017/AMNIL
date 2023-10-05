const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const port = process.env.PORT || 8080;
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
