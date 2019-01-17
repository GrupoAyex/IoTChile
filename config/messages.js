const ackMsg = {
  ok: true,
  message: "Packet Received"
};

const noAckMsg = {
  ok: false,
  message: "Error:"
};

const invalidTypeAckMsg = {
  ok: false,
  message: "Invalid Packet Type"
};

module.exports = { ackMsg, noAckMsg, invalidTypeAckMsg };
