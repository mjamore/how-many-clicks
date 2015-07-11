var socket;

(function() {
	$(function() {

		console.log('jQuery is working');
		socket = io.connect('http://localhost:8080');

		socket.on('MyEvent', function(message) {
			console.log(message);
		});

		$('.the-btn').on('click', function() {
			socket.emit('btn-clicked');
		});

		socket.on('count-updated', function(data) {
			console.log(data);
			$('.count').text(data.count);
		});
		
	});
})();