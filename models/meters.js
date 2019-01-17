/**********************************************************
 * Module: Models -> Meters
 * Description: schema for meters
 *
 *********************************************************/
const Joi = require("joi"); //Package for validation
const mongoose = require("mongoose"); //DB connection

const meterSchema = new mongoose.Schema({
  UID: {
    type: String
  },
  COUTDENO: {
    type: String
  },
  BILLDENO: {
    type: String
  },
  PAYBACK: {
    type: String
  },
  IPID: {
    type: String
  },
  ACHOUR: {
    type: String
  },
  ACMINUTE: {
    type: String
  },
  ACSECOND: {
    type: String
  },
  TIME: {
    type: Date
  }
});

const Meter = mongoose.model("Meter", meterSchema);

function validateMeter(Meter) {
  const schema = {
    TYPE: Joi.string(),
    UID: Joi.string()
      .min(1)
      .max(100)
      .required(),
    //IPID: Joi.string(),
    COUTDENO: Joi.number()
      .min(0)
      .max(99999999),

    //PAYBACK: Joi.string(),
    BILLDENO: Joi.string(),
    TIME: Joi.string()
  };

  return Joi.validate(Meter, schema);
}

exports.meterSchema = meterSchema;
exports.Meter = Meter;
exports.validate = validateMeter;
