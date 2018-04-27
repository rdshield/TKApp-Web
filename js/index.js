(function(ready, EventEmitter) {

  ready(function() {
	
    EventEmitter.emit('HomePage:mount')
	console.log(store.get('userSub'));
  })

})(window.ready, window.EventEmitter)