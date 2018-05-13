(function(EventEmitter, tmpl, Cognito, DBClient){
	/* HomePage */
	var $root = document.getElementById('root'), 
		$container = document.createElement('div'),
		$tnLeft = document.getElementById('topNavLeft'),
		$tnRight = document.getElementById('topNavRight'),
		$title, $alert, $button, $form,	$link;
		
	function addAlert(options) {
		$title.insertAdjacentHTML('afterend', tmpl('Alert', options));
	}

	function removeAlert() {
		$alert = $container.getElementsByClassName('Alert')[0];
		$alert && $alert.remove();
	}

	function setupTNLeft(){	}  

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
		handleChildLink();
		Cognito.isAuthenticated().then(function() { 
			$container.innerHTML = tmpl('HomePage', {})
			setupTNLeft();
			setupTNRight();
			$root.appendChild($container);

			if (message) {
				addAlert(message);
			}
			handleChildLink();
		}).catch(function(error) {
			console.log(error);
			redirectToLogin();
		})
  })
				
 
  EventEmitter.on('HomePage:unmount', function() {
	while ($tnRight.firstChild) {
		$tnRight.removeChild($tnRight.firstChild);
	}
	$container.remove();
  })
})(window.EventEmitter,window.tmpl,window.Cognito,window.DBClient)
