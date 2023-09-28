const fs = require("fs");
const path = require("path");
const ordersPath = path.join(__dirname, "../models/orderlist.json");
const cartPath = path.join(__dirname, "../models/cartItems.json");

const orders = require(ordersPath);
const products = require("../models/products.json");
const cartItems = require(cartPath);

exports.getAllOrders = (req, res) => {
  res.status(200).json(orders);
};

exports.getOrderById = (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find((order) => order.id === orderId);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.status(200).json(order);
};

exports.addToCart = (req, res) => {
  const newCart = req.body;
  const existingCartIndex = cartItems.findIndex(
    (cart) => cart.user_id === newCart.user_id
  );

  if (existingCartIndex !== -1) {
    const existingCart = cartItems[existingCartIndex];

    newCart.items.forEach((item) => {
      const existingItemIndex = existingCart.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        // Item already exists, increase its quantity
        existingCart.items[existingItemIndex].quantity += item.quantity;
      } else {
        // Item doesn't exist, push new item to the existing user's cart
        existingCart.items.push(item);
      }
    });

    // Recalculate the total price of the cart
    existingCart.total_price = calculateCartTotalPrice(existingCart);

    // Update the existing cart in the array
    cartItems[existingCartIndex] = existingCart;
  } else {
    // New cart, add it to the array
    cartItems.push(newCart);
  }

  // Write the updated cartItems to the file
  writeJsonFile(cartPath, cartItems);

  res.status(200).json(newCart);
};

exports.checkout = (req, res) => {
  const cartId = parseInt(req.params.cartId);
  const userCartIndex = cartItems.findIndex((cart) => cart.id === cartId);

  if (userCartIndex === -1) {
    return res.status(404).json({ error: "Cart not found" });
  }

  const userCart = cartItems[userCartIndex];

  if (userCart.is_ordered) {
    return res.status(400).json({ error: "Cart already ordered" });
  }

  if (userCart.total_price < 100) {
    return res
      .status(400)
      .json({ error: "Minimum threshold for total price of an order is 100" });
  }

  // Remove the cart as it's being checked out
  cartItems.splice(userCartIndex, 1);

  // Create a new order
  const newOrder = {
    id: orders.length + 1,
    user_id: userCart.user_id,
    cart_id: cartId,
    items: userCart.items,
    total_price: userCart.total_price,
    order_status: "pending",
    order_date: new Date().toISOString().slice(0, 10),
  };

  orders.push(newOrder);

  // Write the updated orders and cartItems to their respective files
  writeJsonFile(ordersPath, orders);
  writeJsonFile(cartPath, cartItems);

  res.status(201).json(newOrder);
};

// Helper function to calculate the total price of a cart
function calculateCartTotalPrice(cart) {
  return cart.items
    .reduce((acc, item) => {
      const product = products.find((product) => product.id === item.id);
      return acc + product.price * item.quantity;
    }, 0)
    .toFixed(2);
}

// Helper function to write JSON data to a file
function writeJsonFile(filePath, data) {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}
