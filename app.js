
/**
 *@Author: Lorenzo Gamboa
 *@Desc: Start app
 */
 
 
// Import Express module
var express = require('express');

//Import Expres path
var path = require('path');

//Creating Expres app
var app = express();

//Importing create class
var create_game = require('./server/creategame');


//Acessing static files (css,js..)
app.use("/lib", express.static(path.join(__dirname + '/public/lib')));

// Create a simple Express application
app.get('/rankings.*', function(req, res){
   //console.log("Página solicitada ===> "+req.params[0]);
  // Serve static html, js, css, and image files from the 'public' directory
  res.sendFile(__dirname + '/public/rankings.html');
	
});

// Create a simple Express application
app.get('/create.*', function(req, res){
   //console.log("Página solicitada ===> "+req.params[0]);
  // Serve static html, js, css, and image files from the 'public' directory
  res.sendFile(__dirname + '/public/create.html');
	
});


// Create a simple Express application
app.get('/', function(req, res){
   console.log("Pagina principal solicitada");
   res.sendFile(__dirname + '/public/index.html');
	
});


//Create http server with Node's HTTP module
var server = require('http').createServer(app).listen(process.env.PORT || 8080);


// Instantiate Socket.io and will be listeing to Express/HTTP server
var io = require('socket.io').listen(server);
console.log("Server launched on port 8080 or " + process.env.PORT);


// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
	 console.log('a user connected with id : '+socket.id);

    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        socket.join(room);
		console.log(room);
    });
});

