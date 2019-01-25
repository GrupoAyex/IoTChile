/**********************************************************
 * Socket Server for IOT
 *
 *
 *********************************************************/
require("../config/config");
require("../startup/db")();
const { saveData } = require("../config/firebase");

const { Meter, validate } = require("../models/meters");
const {
  ackMsg,
  noAckMsg,
  invalidTypeAckMsg,
  noJsonAckMsg
} = require("../config/messages");
const fs = require("fs");
const http = require("http");
const _ = require("lodash");

//Generamos un servidor HTTP
const httpServer = http.createServer();
httpServer.listen(process.env.PORT, "0.0.0.0");
const webSocketServer = require("ws").Server;
//npm i ws --save
//npm i ws@1.0.1

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

  /*
  console.log({
    client: clientInfo.ip,
    message: JSON.stringify(packetReceived)
  });
  */

  //OnMessage Received
  ws.on("message", async function incoming(message) {
    let packetReceived = {};

    /*
    try {
      packetReceived = JSON.parse(message);
    } catch {
      console.log("ERROR", message);
      return;
    }
    console.log({
      client: clientInfo.ip,
      message: JSON.stringify(packetReceived)
    });
    */
    try {
      packetReceived = JSON.parse(message);

      const { TYPE } = packetReceived;

      switch (String(TYPE).toUpperCase()) {
        case "METER":
          //const { error } = validate(packetReceived);

          const error = false;
          if (error) {
            //TODO ADD Validations
            // console.log("DETALLE", error.details[0]);
            ws.send(JSON.stringify(invalidTypeAckMsg));
          } else {
            /*
            let meter = _.omit(new Meter(packetReceived), [
              ACSECOND,
              ACDAY,
              TYPE,
              ACMINUTE
            ]);
            */

            //Parsear package

            //saveData(_.omit(JSON.stringify(packetReceived), "ROLLOVER_C_B"));
            saveData(packetReceived);

            ws.send(JSON.stringify(ackMsg));

            /* MONGO DB
            await meter.save((err, data) => {
              if (err) {
                ws.send(JSON.stringify(noAckMsg));
              } else {
                ws.send(JSON.stringify(ackMsg));
              }
            });
            */
          }
          break;
        case "LOG":
          break;
        case "NOTDEFINED":
          break;
        default:
          ws.send(JSON.stringify(invalidTypeAckMsg));
      }
    } catch (e) {
      ws.send(JSON.stringify(noJsonAckMsg));
      console.log("ERROR JSON MAL FORMED FROM -> " + clientInfo.ip, message);
      return;
    }

    //Get Packet Type
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
