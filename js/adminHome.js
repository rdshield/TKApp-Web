(function(ready, EventEmitter) {
	ready(function() {
		EventEmitter.emit('AdminHome:mount')
	})
})(window.ready, window.EventEmitter)