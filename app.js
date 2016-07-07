
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


//Acessing static files (css,js..)
app.use("/lib", express.static(path.join(__dirname + '/public/lib')));

// Create a simple Express application
app.get('/rankings.html', function(req, res){
   //console.log("Página solicitada ===> "+req.params[0]);
  // Serve static html, js, css, and image files from the 'public' directory
  res.sendFile(__dirname + '/public/rankings.html');
	
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
console.log("Server launched on port 8080");


io.sockets.on('connection', function (socket) {
	//console.log('client connected');
	game.initGame(io,socket);
	
	
});