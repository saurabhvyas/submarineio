/**
 *@Author: Lorenzo Gamboa Garcia
 *@Description: Js file to create rooms
 */
 
var io;
var gameSocket;



/**
 * This object will be instance when a user reach out create.html
 */
exports.initRoom = function(sio,socket){
io = sio;
gameSocket = socket;
console.log("Setting room with io : "+io);
console.log("Setting room with socket : "+gameSocket);

}

/**
 * The 'START' button was clicked and 'hostCreateNewGame' event occurred.
 */
function hostCreateNewGame() {
    // Create a unique Socket.IO Room
    var thisGameId = ( Math.random() * 100000 ) | 0;

    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    this.emit('newGameCreated', {gameId: thisGameId, mySocketId: this.id});

    // Join the Room and wait for the players
    this.join(thisGameId.toString());
};

function removingRoom(){
	
	
}

