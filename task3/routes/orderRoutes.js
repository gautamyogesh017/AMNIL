const express = require("express");
const {
  addToCart,
  getAllOrders,
  getOrderById,
  viewCart,
  checkOut,
} = require("../controller/order.controller");

const router = express.Router();

router.route("/").get(getAllOrders);

router.route("/:id").get(getOrderById);

router.route("/add-to-cart").post(addToCart);

router.route("/view-cart/:id").get(viewCart);

router.route("/checkout/:userId/:cartId").post(checkOut);

module.exports = router;
