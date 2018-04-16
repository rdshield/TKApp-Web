(function(EventEmitter, tmpl, Cognito){
	/* Admin Guardians Page */
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
		$temp = document.getElementById('topNav__LChallenges');
		$temp.addEventListener('click', handleChallengeLink);
		$tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LUsers', msg:'Guardians' }));
		$temp = document.getElementById('topNav__LUsers');
		$temp.addEventListener('click', handleUserLink);
		$tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LAdmins', msg:'Admin Settings' }));
		$temp = document.getElementById('topNav__LAdmins');
		$temp.addEventListener('click', handleSettingsLink);
	}  

	function setupTNRight(){
		$tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'Logout', msg:'Logout' }));
		$temp = document.getElementById('topNav__Logout');
		$temp.addEventListener('click', handleLogOut);
	}

	function handleChallengeLink() {
		EventEmitter.emit('GuardianPage:unmount');
		EventEmitter.emit('ChallengePage:mount');
	}
  
	function handleUserLink() {
		EventEmitter.emit('GuardianPage:unmount');
		EventEmitter.emit('ChallengePage:mount');
	}
  
	function handleSettingsLink() {
		EventEmitter.emit('GuardianPage:unmount');
		EventEmitter.emit('SettingsPage:mount');
	}
  
	function handleLogOut() {
		EventEmitter.emit('GuardianPage:unmount');
		Cognito.signOut();
		window.location.replace("./admin.php","Admin Login") 
	}
  
	EventEmitter.on('GuardianPage:mount', function(message) {
	    Cognito.isNotAuthenticated()
		.then(function() {
			$container.innerHTML = tmpl('GuardiansPage', {})
			setupTNLeft();
			setupTNRight();
			$root.appendChild($container);

			if (message) {	addAlert(message);	}
		})
	})

	EventEmitter.on('GuardianPage:unmount', function() {
		$temp = document.getElementById('topNav__LChallenges');
		$temp.removeEventListener('click', handleChallengeLink);
		$temp = document.getElementById('topNav__LUsers');
		$temp.removeEventListener('click', handleUserLink);
		$temp = document.getElementById('topNav__LAdmins');
		$temp.removeEventListener('click', handleSettingsLink);
		$temp = document.getElementById('topNav__Logout');
		$temp.addEventListener('click', handleLogOut);
		
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
