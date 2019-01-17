/**********************************************************
 * Socket Server for IOT
 *
 *
 *********************************************************/

require("../config/config");
require("../startup/db")();

const { Meter, validate } = require("../models/meters");
const { ackMsg, noAckMsg, invalidTypeAckMsg } = require("../config/messages");

const fs = require("fs");

const http = require("http");

const httpServer = http.createServer();

httpServer.listen(process.env.PORT, "0.0.0.0");
const webSocketServer = require("ws").Server;

const wss = new webSocketServer({
  server: httpServer,
  clientTracking: true
});

wss.on("listening", () => {
  console.log(`WebSocket IOT is listening on port ${process.env.PORT}`);
});

wss.on("connection", (ws, req) => {
  const clientInfo = {
    ip: req.connection.remoteAddress,
    headers: req.headers,
    Clients: wss.clients,
    Socket: ws
  };

  //OnMessage Received
  ws.on("message", async function incoming(message) {
    const packetReceived = JSON.parse(message);
    console.log("Message Received : ", {
      client: clientInfo.ip,
      message: JSON.stringify(packetReceived)
    });

    //Get Packet Type
    const { TYPE } = packetReceived;

    switch (String(TYPE).toUpperCase()) {
      case "METER":
        const { error } = validate(packetReceived);

        if (error) {
          //TODO ADD Validations
          // console.log("DETALLE", error.details[0]);
          ws.send(JSON.stringify(invalidTypeAckMsg));
        } else {
          let meter = new Meter(packetReceived);

          await meter.save((err, data) => {
            if (err) {
              ws.send(JSON.stringify(noAckMsg));
            } else {
              ws.send(JSON.stringify(ackMsg));
            }
          });
        }
        break;
      case "LOG":
        break;
      case "NOTDEFINED":
        break;
      default:
        ws.send(JSON.stringify(invalidTypeAckMsg));
    }
  });

  /*
  ws.send(`Are connected to server`, err => {
    if (err) console.log("Error to send");
  });
  */
  //Detect Connection Broken
  //ws.isAlive = true;
  //ws.on('pong', heartbeat);
});

/**********************************************************
 * Sent Binary Data
     const array = new Float32Array(5);
 
    for (var i = 0; i < array.length; ++i) {
        array[i] = i / 2;
    }
    ws.send(array);
***********************************************************/

/***********************************************************
 *************** Detect Connection Broken ******************
 **********************************************************/
function noop() {}

function heartbeat() {
  this.isAlive = true;
}

/*
const interval = setInterval(function ping() {
    if (process.env.CHKCONN === true) console.log('checking connection');
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        ws.ping(noop);
    });
}, 3000);
*/
