(function(EventEmitter, tmpl, Cognito){
  /* AdminPage */
  var $root = document.getElementById('root'), 
    $container = document.createElement('div'),
	$tnLeft = document.getElementById('topNavLeft'),
	$tnRight = document.getElementById('topNavRight'),
    $title,
    $close,
    $alert,
    $button,
    $form,
    $link;

  function addAlert(options) {
    $title.insertAdjacentHTML('afterend', tmpl('Alert', options));
    $close = $container.getElementsByClassName('Alert__close')[0];
    $close.addEventListener('click', handleClose);
  }

  function removeAlert() {
    $alert = $container.getElementsByClassName('Alert')[0];
    $alert && $alert.remove();
    $close && $close.removeEventListener('click', handleClose);
  }

  function handleClose(event) {
    event.target.parentNode.remove()
  }

  function setupTNLeft(){
	  $tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LChallenges' , msg:'Challenges'  }));
	  $c = document.getElementById('topNav__LChallenges');
	  $c.addEventListener('click', handleChallengeLink);
	  $tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LUsers', msg:'Guardians' }));
	  $b = document.getElementById('topNav__LUsers');
	  $b.addEventListener('click', handleUserLink);
	  
  }  

  function setupTNRight(){
	  $tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'Logout', msg:'Logout' }));
	  $b = document.getElementById('topNav__Logout');
	  $b.addEventListener('click', handleLogOut);
  }  
  
  function handleChallengeLink() {
    EventEmitter.emit('HomePage:unmount');
    EventEmitter.emit('HomePage:mount');
  }
  
  function handleUserLink() {
    EventEmitter.emit('HomePage:unmount');
    EventEmitter.emit('HomePage:mount');
  }
  
  function handleHomeLink() {
    EventEmitter.emit('HomePage:unmount');
    EventEmitter.emit('HomePage:mount');
  }
  
  function handleChildLink() {
    EventEmitter.emit('HomePage:unmount');
    EventEmitter.emit('HomePage:mount');
  }
  
  function handleLogOut() {
    EventEmitter.emit('HomePage:unmount');
	Cognito.signOut();
    window.location.replace("./index.html","Login") 
  }
  
  EventEmitter.on('HomePage:mount', function(message) {
	
    Cognito.isNotAuthenticated()
    .then(function() {
      $container.innerHTML = tmpl('HomePage', {})
	  setupTNLeft();
	  setupTNRight();
      $root.appendChild($container);

      if (message) {
        addAlert(message);
      }
    })
  })

 
  EventEmitter.on('HomePage:unmount', function() {
	$b = document.getElementById('topNav__LHome');
	$b && $b.removeEventListener('click', handleHomeLink);
	$c = document.getElementById('topNav__LChild');
	$c && $c.removeEventListener('click', handleChildLink);
	while ($tnRight.firstChild) {
		$tnRight.removeChild($tnRight.firstChild);
	}
	while ($tnLeft.firstChild) {
		$tnLeft.removeChild($tnLeft.firstChild);
	}
	$container.remove();
  })
})(
  window.EventEmitter, 
  window.tmpl, 
  window.Cognito
)
