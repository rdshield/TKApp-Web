(function(ready, EventEmitter) {
	ready(function() {
		EventEmitter.emit('AdminChallenges:mount')
	})
})(window.ready, window.EventEmitter)