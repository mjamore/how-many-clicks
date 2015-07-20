// Dependencies
var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


// Start server
server.listen(8080);


// Setup routing for static assets
app.use('/public', express.static('public'));


// Express routes
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});


// Socket.io
io.on('connection', function(socket) {
	var count;

	// Read the count value from count.txt
	fs.readFile('count.txt', 'utf-8', function(err, data) {
		count = data;

		// Send the count to the client when they initially connect
		socket.emit('new-client-connection', {
			count: data
		});
	});

	// When a client clicks the button
	socket.on('btn-clicked', function() {

		// Read the count from count.txt
		fs.readFile('count.txt', 'utf-8', function(err, data) {
			count = data;
			count ++;

			// Write the incremented value to count.txt
			fs.writeFile('count.txt', count, function(err, data) {

				// Emit the 'count-updated' event to all connected clients with the updated count value
				io.sockets.emit('count-updated', {
					count: count
				});
			});
		});
	});
});
