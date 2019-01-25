var admin = require("firebase-admin");
var serviceAccount = require("./service-account");
const moment = require("moment");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ayex-siessa.firebaseio.com"
});

const firebase = require("firebase-admin");

const db = firebase.database();

/* GETDATE */
/*
var ref = db.ref("server/saving-data/fireblog/");


ref.on(
  "value",
  function(snapshot) {
    console.log(snapshot.val());
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);

//SAVE DATA
var usersRef = ref.child("users");
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});
*/

const saveData = data => {
  var ref = db.ref("online/salaCentral/meters/history");

  //var metersRef = ref.child(moment().format("x")); //data.TIME);
  //metersRef.set(data);

  ref.remove();

  ref = db.ref("online/salaCentral/meters/");
  metersRef = ref.child(data.UID);
  metersRef.set(data);
};

module.exports = { saveData };
