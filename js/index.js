(function(ready, EventEmitter) {

  ready(function() {
	
    EventEmitter.emit('HomePage:mount')
  })

})(window.ready, window.EventEmitter)