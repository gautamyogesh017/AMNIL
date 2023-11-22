const { initializeApp } = require("firebase-admin/app");

const cred = require("../middlewares/serviceAccountKey.json");
const app = initializeApp();
