const express = require("express");
const router = express.Router();

const {
  createProducts,
  getAllProducts,
  getOneProduct,
  updateProducts,
  deleteProducts,
  getOutOfStocks,
} = require("../controllers/productController");

router.route("/").get(getAllProducts).post(createProducts);
router
  .route("/:id")
  .get(getOneProduct)
  .put(updateProducts)
  .delete(deleteProducts);

router.route("/outofstock").get(getOutOfStocks);
