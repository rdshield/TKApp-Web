(function(ready, EventEmitter) {

  ready(function() {
    EventEmitter.emit('LoginForm:mount')
  })

})(document.ready, document.EventEmitter)
