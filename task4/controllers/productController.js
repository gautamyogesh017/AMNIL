const Product = require("../models/productSchema");

exports.createProducts = async (req, res) => {
  const { id, name, price, description, quantity, product_type } = req.body;

  try {
    const productExists = await Product.findOne({ id });

    if (productExists) {
      return res.status(400).json({ message: "The product already exists" });
    }

    const newProduct = new Product({
      id,
      name,
      price,
      description,
      quantity,
      product_type,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();

    res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
exports.getOneProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ error: "The product was not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateProducts = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (req.body.name) product.name = req.body.name;
    if (req.body.price) product.price = req.body.price;
    if (req.body.description) product.description = req.body.description;
    if (req.body.quantity) product.quantity = req.body.quantity;
    if (req.body.product_type) product.product_type = req.body.product_type;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteProducts = async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const product = await Product.findOneAndDelete({ id: productId });

    if (!product) {
      return res.status(404).json({ error: "This Product doesnt exist" });
    }

    res.status(200).send("The Product has been deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getOutOfStocks = async (req, res) => {
  try {
    const outOfStocks = await Product.find({ quantity: { $lt: 5 } });

    if (outOfStocks.length === 0) {
      return res.json({ message: "Oops!! The product is out of stock" });
    }

    res.status(200).json(outOfStocks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
exports.sortProductsByPrice = async (req, res) => {
  try {
    const sortedProducts = await Product.find().sort({ price: 1 });

    res.json(sortedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
