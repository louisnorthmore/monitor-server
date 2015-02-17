/*
  Module dependencies:

  - Express
  - Http (to run Express)
  - Body parser (to parse JSON requests)

  It is a common practice to name the variables after the module name.
  Ex: http is the "http" module, express is the "express" module, etc.
*/
var express = require("express")
  , app = express()
  , http = require("http").createServer(app)
  , io = require("socket.io").listen(http)
  , bodyParser = require("body-parser");

var fs = require("fs");
var file = "monitor.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

/* Server config */

//Server's IP address
app.set("ipaddr", "");

//Server's port number
app.set("port", 8080);

//Tells server to support JSON requests
app.use(bodyParser.json());

/* Server routing */

//Handle route "GET /", as in "http://localhost:8080/"
app.get("/", function(request, response) {

response.sendfile('index.html');

});

//POST method to create a chat message
app.post("/message", function(request, response) {

  //build our data
  var timestamp = Math.round(+new Date()/1000); // unix timestamp
  var message = request.body.message;
  var name = request.body.name;
  var id = new Date();
  var type = request.body.type;

  if(!type) {
    type = 'default';
  }

  io.sockets.emit("message", {id: id, type: type, message: message, name: name, timestamp: timestamp});

  console.log(timestamp + " : " + type + " : " + name + " : " + message);

  //Looks good, let the client know
  response.json(200, {message: "Message received"});


});

/* Socket.IO events */
io.on("connection", function(socket){



});


//Start the http server at port and IP defined before
http.listen(app.get("port"), app.get("ipaddr"), function() {
  console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});
