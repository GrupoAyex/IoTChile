process.env.PORT = process.env.PORT || 3000;
process.env.CHKCONN = process.env.CHKCONN || false;

//---------------------------------------------------------
// Database String connection
//---------------------------------------------------------
let dbConnectionString;

process.env.NODE_ENV === "dev"
  ? (dbConnectionString =
      "mongodb://iot:Pepe1234@ds255794.mlab.com:55794/iotchile")
  : (dbConnectionString =
      "mongodb://iot:Pepe1234@ds255794.mlab.com:55794/iotchile"); //process.env.MONGO_URI

process.env.DBCONNSTR = dbConnectionString;
