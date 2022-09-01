const EventEmitter = require("events");
class Logger extends EventEmitter {
  log(message) {
    //send an HTTP request
    console.log(message);
    this.emit("logging", { data: "Hey there!" });
  }
}

// Raise an event

module.exports = Logger;
