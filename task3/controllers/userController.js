const users = require("../models/user.json");
const fs = require("fs");
const path = require("path");
const usersPath = path.join(__dirname, "../models/user.json");

// creating new user in user json

exports.createUser = async (req, res) => {
  const newUser = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
  };

  const userExists = users.find(
    (existingUser) => existingUser.email === req.body.email
  );
  if (userExists) {
    return res.status(400).send({ message: "Email already exists" });
  }

  users.push(newUser);

  fs.writeFile(usersPath, JSON.stringify(users, null, 2), "utf8", (error) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
    res.status(201).send(newUser);
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const userData = fs.readFileSync(usersPath, "utf8");
    const users = JSON.parse(userData);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const userData = fs.readFileSync(usersPath, "utf8");
    const users = JSON.parse(userData);

    const user = users.find((user) => user.id === userId);

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
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingUser = users[userIndex];
    const updatedUser = {
      id: existingUser.id,
      name: req.body.name || existingUser.name,
      address: req.body.address || existingUser.address,
    };

    users[userIndex] = updatedUser;

    fs.writeFile(usersPath, JSON.stringify(users, null, 2), "utf8", (error) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal Server error!");
      }
      res.status(200).send(updateUser);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error!");
  }
};

exports.deleteUser = async (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("User doesnt exists!!");
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  fs.writeFile(usersPath, JSON.stringify(users, null, 2), "utf8", (error) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error!!");
    }
    res.status(200).send("User has been deleted");
  });
};
