const express = require("express");

const {
  createStore,
  getAllStores,
  getOneStore,
  updateStore,
  getNearbyStores,
} = require("../modules/store/storeController");
const router = express.Router();

router.route("/").get(getAllStores).post(createStore).get(getNearbyStores);
router.route("/:id").get(getOneStore).put(updateStore);
module.exports = router;
