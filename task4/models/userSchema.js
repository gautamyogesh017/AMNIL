const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
  {
    collection: "UserRegister",
  }
);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
