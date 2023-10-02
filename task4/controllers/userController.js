const User = require("../models/userSchema");

exports.createUser = async (req, res) => {
  const { id, name, email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    }
    const newUser = new User({ id, name, email });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
exports.updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
exports.deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await User.findOneAndDelete({ id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send("User has been deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
