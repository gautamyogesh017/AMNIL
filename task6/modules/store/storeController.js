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

exports.getAllStores = async (req, res) => {
  try {
    const allStores = await Store.find();
    res.json(allStores);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error!!");
  }
};

exports.getOneStore = async (req, res) => {
  try {
    const storeId = parseInt(req.params.id);
    const Store = await Store.findById(storeId).populate("User");

    if (!storeId) {
      return res.status(404).json({ error: "Store not found" });
    }
    return res.status(200).json({ message: "Store", storeId });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error!");
  }
};

exports.updateStore = async (req, res) => {
  try {
    const storeId = parseInt(req.params.id);

    const store = await Store.findByIdAndUpdate({ id: storeId });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getNearbyStores = async (req, res) => {
  try {
    const { longitude, latitude, storeName } = req.body;

    const nearbyStores = await Store.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          distanceField: "dist.calculated",
          maxDistance: 1000,
          spherical: true,
        },
      },
      {
        $match: {
          storeName: new RegExp(storeName, "i"),
        },
      },
    ]);
    res.json(
      res.status(200).send({
        message: "Nearby stores under the radius 1kilometer are",
        nearbyStores,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
