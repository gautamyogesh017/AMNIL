const express = require("express");
const router = express.Router();

const {
  createUser,
  getOneUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
} = require("../modules/users/userController");

router.route("/").get(getAllUsers).post(createUser);
router.route("/login").post(loginUser);

router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);
module.exports = router;
