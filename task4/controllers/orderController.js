const mongoose = require("mongoose");
const Order = require("../models/orderSchema");
const Cart = require("../models/cartSchema");

exports.getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find();

    res.status(200).json(allOrders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);

    const order = await Order.findOne({ id: orderId });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.addToCart = async (req, res) => {
  try {
    const newCart = req.body;

    const existingCart = await Cart.findOneAndUpdate(
      { user_id: newCart.user_id },
      newCart,
      { upsert: true, new: true }
    );

    res.status(200).json(existingCart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.viewCart = async (req, res) => {
  const userId = req.params.id;

  try {
    const cart = await Cart.findOne({ user_id: userId }).populate(
      "items.product"
    );

    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
exports.checkOut = async (req, res) => {
  const cartId = parseInt(req.params.cartId);

  try {
    const userCart = await Cart.findOne({ id: cartId });

    if (!userCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    if (userCart.is_ordered) {
      return res.status(400).json({ error: "Cart already ordered" });
    }

    if (userCart.total_price < 100) {
      return res.status(400).json({
        error: "Minimum threshold for total price of an order is 100",
      });
    }

    const newOrder = new Order({
      user_id: userCart.user_id,
      cart_id: cartId,
      items: userCart.items,
      total_price: userCart.total_price,
      order_status: "pending",
      order_date: new Date().toISOString().slice(0, 10),
    });

    await newOrder.save();

    userCart.is_ordered = true;
    await userCart.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
