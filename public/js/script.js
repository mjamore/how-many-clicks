(function() {
	$(function() {

		var socket = io.connect('http://localhost:8080');

		// When the 'new-client-connection' event happens, set the count on the page
		socket.on('new-client-connection', function(data) {
			$('.count').text(data.count);
		});

		// When the button is clicked, emit the 'btn-clicked' event
		$('.the-btn').on('click', function() {
			socket.emit('btn-clicked');
		});

		// When the 'count-updated' event happens, update the count on the page
		socket.on('count-updated', function(data) {
			$('.count').text(data.count);
		});
		
	});
})();