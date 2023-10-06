const User = require("../../models/userSchema");
const Product = require("../../models/productSchema");
const Store = require("../../models/storeSchema");

exports.createStore = async (req, res) => {
  try {
    existingStore = await Store.findOne({ name: req.body.name });

    if (existingStore) {
      return res.status(409).send("The Store exists already");
    }
    const store = {
      user: req.body.userId,
      name: req.body.name,
      type: req.body.type,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(req.body, longitude),
          parseFloat(req.body.latitude),
        ],
      },
      img: req.file.filename,
    };
    await store.save();
    res.status(201).send(store);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
