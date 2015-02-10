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

  //The request body expects a param named "message"
  var message = request.body.message;
  var name = request.body.name;

  io.sockets.emit("message", {message: message, name: name});

  console.log(name + " : " + message);

  //Looks good, let the client know
  //response.json(200, {message: "Message received"});


});

/* Socket.IO events */
io.on("connection", function(socket){

 

});


//Start the http server at port and IP defined before
http.listen(app.get("port"), app.get("ipaddr"), function() {
  console.log("Server up and running. Go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});
