//const winston = require("winston");
const mongoose = require("mongoose");
const config = require("../config/config");

module.exports = function() {
  dbConnectionString =
    "mongodb://iot:Pepe1234@ds255794.mlab.com:55794/iotchile";

  //const db = config.db; //config.get("db");
  mongoose
    .connect(dbConnectionString)
    .then(() => console.log(`Connected to Database ${dbConnectionString}...`))
    .catch(err =>
      console.log(`COULD NOT Connect to Database ${dbConnectionString}...`)
    );
};
