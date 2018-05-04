(function(EventEmitter, tmpl, Cognito, DBClient){
	/* AdminHome */
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
	
	//Functions for On-screen Alerts
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

	//Setup for Left/Right Top Navigation bar
	function setupTNLeft(){
		$tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LHome' , msg:'Home'  }));
		$temp = document.getElementById('topNav__LHome');
		$temp.addEventListener('click', handleHomeLink);
		$tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LChallenges' , msg:'Challenges'  }));
		$temp = document.getElementById('topNav__LChallenges');
		$temp.addEventListener('click', handleChallengeLink);
		$tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LUsers', msg:'Guardians' }));
		$temp = document.getElementById('topNav__LUsers');
		$temp.addEventListener('click', handleGuardiansLink);
		$tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LAdmins', msg:'Admin Settings' }));
		$temp = document.getElementById('topNav__LAdmins');
		$temp.addEventListener('click', handleSettingsLink);
	}  

	function setupTNRight(){
		$tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'Logout', msg:'Logout' }));
		$temp = document.getElementById('topNav__Logout');
		$temp.addEventListener('click', handleLogOut);
	}

	//Redirect to Mission Management Page
	function handleChallengeLink() {
		EventEmitter.emit('AdminHome:unmount');
		EventEmitter.emit('AdminChallenges:mount');
	}
	
	//Reset Home page back to default view/settings
	function handleHomeLink() {
		EventEmitter.emit('AdminHome:unmount');
		EventEmitter.emit('AdminHome:mount');
	}
  
	//Redirect to Guardian Management Page
	function handleGuardiansLink() {
		EventEmitter.emit('AdminHome:unmount');
		EventEmitter.emit('AdminGuardians:mount');
	}
  
	//Redirect to Setting Page
	function handleSettingsLink() {
		EventEmitter.emit('AdminHome:unmount');
		EventEmitter.emit('AdminSettings:mount');
	}

	//Close all open sessions and redirect to the admin login page
	function handleLogOut() {
		EventEmitter.emit('AdminHome:unmount');
		Cognito.signOut();
		window.location.replace("./admin-login.php","Admin Login") 
	}
  
	EventEmitter.on('AdminHome:mount', function(message) {
		Cognito.isAuthenticated().then(function() { 
			$container.innerHTML = tmpl('HomePage', {})
			setupTNLeft();
			setupTNRight();
			$root.appendChild($container);

			if (message) {
				addAlert(message);
			}
		}).catch(function(error) {
			console.log(error);
			handleLogOut();
		})
	})

	EventEmitter.on('AdminHome:unmount', function() {
		$temp = document.getElementById('topNav__LHome');
		$temp.removeEventListener('click', handleHomeLink);
		$temp = document.getElementById('topNav__LChallenges');
		$temp.removeEventListener('click', handleChallengeLink);
		$temp = document.getElementById('topNav__LUsers');
		$temp.removeEventListener('click', handleGuardiansLink);
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
  window.Cognito,
  window.DBClient,
)
