(function(ready, EventEmitter) {

  ready(function() {
	
    EventEmitter.emit('ChildPage:mount')
  })

})(window.ready, window.EventEmitter)