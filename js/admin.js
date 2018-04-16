(function(ready, EventEmitter) {

  ready(function() {
    EventEmitter.emit('AdminLogin:mount')
  })

})(window.ready, window.EventEmitter)
