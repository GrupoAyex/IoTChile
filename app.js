require("./startup/db")();
require("./startup/config")();
//require("./startup/validation")();
const server = require("./server/server");

//require("./startup/validation")();

/*
const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
    winston.info(`Server IoT Listening on port ${port}...`)

);
*/

//module.exports = server;
