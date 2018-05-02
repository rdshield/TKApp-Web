(function(EventEmitter, tmpl, Cognito, DBClient){
	/* HomePage */
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
		//$tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LHome' , msg:'Home'  }));
		//$c = document.getElementById('topNav__LHome');
		//$c.addEventListener('click', handleHomeLink);
		//$tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LChild', msg:'My Children' }));
		//$b = document.getElementById('topNav__LChild');
		//$b.addEventListener('click', handleChildLink);	
	}  

	function setupTNRight(){
		$tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'Logout', msg:'Logout' }));
		$b = document.getElementById('topNav__Logout');
		$b.addEventListener('click', handleLogOut);
	}  
  
  function handleHomeLink() {
    EventEmitter.emit('HomePage:unmount');
    EventEmitter.emit('HomePage:mount');
  }
  
  function handleChildLink() {
    EventEmitter.emit('HomePage:unmount');
    EventEmitter.emit('ChildPage:mount');
  }
  
  function handleLogOut() {
    EventEmitter.emit('HomePage:unmount');
	Cognito.signOut();
    window.location.replace("./index.html","Login") 
  }
  
    function redirectToLogin(message) {
    EventEmitter.emit('HomePage:unmount');
	window.location.replace('login.php');
  }
  
	EventEmitter.on('HomePage:mount', function(message) { 
		console.log(DBClient);
		handleChildLink();
		Cognito.isAuthenticated().then(function() { 
			
			$container.innerHTML = tmpl('HomePage', {})
			setupTNLeft();
			setupTNRight();
			$root.appendChild($container);

			if (message) {
				addAlert(message);
			}
			console.log(Cognito.getSub());
			handleChildLink();
		}).catch(function(error) {
			console.log(error);
			redirectToLogin();
		})
  })
				
 
  EventEmitter.on('HomePage:unmount', function() {
	//$b = document.getElementById('topNav__LHome');
	//$b && $b.removeEventListener('click', handleHomeLink);
	//$c = document.getElementById('topNav__LChild');
	//$c && $c.removeEventListener('click', handleChildLink);
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
  window.Cognito,
  window.DBClient,
)
