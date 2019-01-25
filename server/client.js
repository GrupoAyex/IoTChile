const WebSocket = require("ws");
const moment = require("moment");
var ws = new WebSocket("https:sierra-io.herokuapp.com");
//const ws = new WebSocket("ws:10.10.3.2:3000");
const _ = require("lodash");
let wsOpen = false;

ws.on("open", function open() {
  wsOpen = true;

  console.log(ws.url);
  console.log("Sending Message to Server");
});

ws.on("message", data => {
  console.log(data);
});

ws.on("close", data => {
  wsOpen = false;
});

setInterval(() => {
  if (wsOpen) {
    console.log("Sending new message");
    let message = {
      UID: 200821,
      COUTDENO: _.ceil(Math.random() * 100),
      BILLDENO: _.ceil(Math.random() * 1000),
      PAYBACK: _.ceil(Math.random() * 10),
      IPID: "10.10.3.4",
      MACID: "84:0D:8E:84:25:7F",
      ACHOUR: moment().format("H"),
      ACMINUTE: 34,
      ACSECOND: 7,
      ACYEAR: 2019,
      ACMONTH: 1,
      ACDAY: 18,
      ACDAYOFWK: 6,
      COUT_PAY: 26,
      ACCOINOUT: 806,
      BILL_INC: 11,
      ACBILLIN: 342,
      TYPE: "METER",
      ROLLOVER_C_B: [0, 0],
      CRC: "31123",
      TIME: moment().format("x")
    };
    ws.send(JSON.stringify(message));
  }
}, 5000);
