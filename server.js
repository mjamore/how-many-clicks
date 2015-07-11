// Dependencies
var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var count = 0;


// Start server
server.listen(8080);


// Setup routing for static assets
app.use(express.static('public'));


// Express routes
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});


// Socket.io
io.on('connection', function(socket) {
	console.log('New client has connected: ' + socket);
	socket.emit('MyEvent', 'new connection');

	socket.on('btn-clicked', function() {
		console.log('button clicked, yo');
		count++;
		console.log('new count: ' + count);
		io.sockets.emit('count-updated', {
			count: count
		});
	});
});
