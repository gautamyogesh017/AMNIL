const products = require("../models/products.json");
const fs = require("fs");
const path = require("path");
const productsPath = path.join(__dirname, "../models/products.json");

exports.createProducts = async (req, res) => {
  const newProduct = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    quantity: req.body.quantity,
    product_type: req.body.product_type,
  };

  const productExists = products.find(
    (existingProduct) => existingProduct.id === req.body.id
  );
  if (productExists) {
    return res.status(400).send({ message: "The product already exists" });
  }

  products.push(newProduct);

  fs.writeFile(
    productsPath,
    JSON.stringify(products, null, 2),
    "utf8",
    (error) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
      }
      res.status(201).send(newProduct);
    }
  );
};

exports.getAllProducts = async (req, res) => {
  try {
    const productData = fs.readFileSync(productsPath, "utf8");
    const products = JSON.parse(productData);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const productData = fs.readFileSync(productsPath, "utf8");
    const products = JSON.parse(productData);

    const product = products.find((product) => product.id === productId);

    if (!product) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updatedProducts = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingProduct = products[productIndex];
    const updatedProduct = {
      id: existingProduct.id,
      name: req.body.name || existingProduct.name,
      address: req.body.address || existingProduct.address,
    };

    products[productIndex] = updatedProduct;

    fs.writeFile(
      productsPath,
      JSON.stringify(products, null, 2),
      "utf8",
      (error) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Internal Server error!");
        }
        res.status(200).send(updateUser);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error!");
  }
};

exports.deleteProducts = async (req, res) => {
  const product = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!product) {
    return res.status(404).send("User doesnt exists!!");
  }
  const index = products.indexOf(product);
  products.splice(index, 1);

  fs.writeFile(
    productsPath,
    JSON.stringify(products, null, 2),
    "utf8",
    (error) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error!!");
      }
      res.status(200).send("User has been deleted");
    }
  );
};
