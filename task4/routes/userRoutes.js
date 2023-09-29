const express = require("express");
const router = express.Router();

const {
  createUser,
  getOneUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);
module.exports = router;
