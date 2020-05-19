const admin = require('firebase-admin');

// const serviceAccount = require("./todo-react-firebase-expr-1eaa7-firebase-adminsdk-z1asd-f86713c85d.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://todo-react-firebase-expr-1eaa7.firebaseio.com"
// });

admin.initializeApp();

const db = admin.firestore();

module.exports = { admin, db };