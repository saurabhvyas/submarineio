
/**
 *@Author: Lorenzo Gamboa
 *@Desc: Start app
 */
 
 
// Import Express module
var express = require('express');
var url = require('url');

//Import Expres path
var path = require('path');

//Creating Expres app
var app = express();

//Importing create class
//var create_game = require('./server/creategame');

//Numer of Users online
var nUsers = 0;

var rooms=[];


//Acessing static files (css,js..)
app.use("/lib", express.static(path.join(__dirname + '/public/lib')));

//HTPP GET request to make room & start Game
app.get('/game', function(req, res){
	var url_parts = url.parse(req.url, true);
	var roomSelected = url_parts.query;
   console.log(roomSelected["rn"]);

  res.sendFile(__dirname + '/public/game.html');
	
});

// This is ranking of top 100 players
app.get('/rankings.*', function(req, res){
   //console.log("Página solicitada ===> "+req.params[0]);
  // Serve static html, js, css, and image files from the 'public' directory
  res.sendFile(__dirname + '/public/rankings.html');
	
});

// This is page to create rooms
app.get('/create.*', function(req, res){
   //console.log("Página solicitada ===> "+req.params[0]);
  // Serve static html, js, css, and image files from the 'public' directory
  res.sendFile(__dirname + '/public/create.html');
	
});

// This is rooms available page
app.get('/join.*', function(req, res){
  //console.log("Página solicitada ===> "+req.params[0]);
  // Serve static html, js, css, and image files from the 'public' directory
  res.sendFile(__dirname + '/public/join.html');
	
});



// This is index.html
app.get('/', function(req, res){
   console.log("Pagina principal solicitada");
   res.sendFile(__dirname + '/public/index.html');
	
});


//Create http server with Node's HTTP module
var server = require('http').createServer(app).listen(process.env.PORT || 8080);


// Instantiate Socket.io and will be listeing to Express/HTTP server
var io = require('socket.io').listen(server);
console.log("Server launched on port 8080 or " + process.env.PORT);


io.to(rooms[0]).emit('welcome event');


io.on('connection', function(socket){
	nUsers++;
	console.log("Numer of users connected ==>"+ nUsers)
    socket.emit('numberofusers', nUsers, function (data) {
      
    });


  socket.on('chat message',(msg)=>{

  console.log(msg);

  io.emit('chat message',msg);


  });
  
  socket.on('create', function(room) {
    //socket.join(room);
	rooms.push(room);
	
	console.log("Rooms Available");

	for(x=0;x<rooms.length;x++){
	
	console.log(rooms[x]);

	}
	
	socket.emit('createdcheck', "Created");
  });
  

  
   socket.emit('rooms', rooms, function (data) {
      
    });
  
  
    socket.on('disconnect', function(){
	nUsers--;
    //console.log('user disconnected');
  });


});

