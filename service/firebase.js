const firebase = require("firebase/app");
require("firebase/storage");
const { firebaseSecret } = require("../secrets/secrets");

// Initialize Firebase
module.exports.firebaseApp = firebase.initializeApp(firebaseSecret);
