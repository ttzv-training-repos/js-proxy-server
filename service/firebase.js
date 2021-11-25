const firebase = require("firebase/app");
require("firebase/storage");
const { firebaseSecret } = require("../config/config");

// Initialize Firebase
module.exports.firebaseApp = firebase.initializeApp(firebaseSecret);
