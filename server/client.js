const WebSocket = require("ws");

const ws = new WebSocket("ws:localhost:3000");
let wsOpen = false;

ws.on("open", function open() {
  wsOpen = true;
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
      TYPE: "meter",
      UID: "macaddress",
      COUTDENO: "111",
      BILLDENO: "2222",
      TIME: Date()
    };
    ws.send(JSON.stringify(message));
  }
}, 5000);
