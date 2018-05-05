(function(EventEmitter, tmpl, Cognito){
	/* Admin Login Form */
	var $root = document.getElementById('root'), 
		$container = document.createElement('div'),
		$tnLeft = document.getElementById('topNavLeft'),
		$tnRight = document.getElementById('topNavRight'),
		$title,
		$alert,
		$button,
		$form,
		$link;

	function startLoading() {
		removeAlert()
		$button = $container.querySelectorAll('input[type=submit]')[0];
		$button.disabled = true;
		$button.value = 'Loading...';
	}

	function stopLoading() {
		$button.disabled = false;
		$button.value = 'Login';
	}

	function addAlert(options) {
		$title.insertAdjacentHTML('afterend', tmpl('Alert', options));
	}

	function removeAlert() {
		$alert = $container.getElementsByClassName('Alert')[0];
		$alert && $alert.remove();
	}

	function setupTNLeft(){	}  

	function setupTNRight(){
		//$tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'Login', msg:'Login' }));
		//$temp = document.getElementById('topNav__Login');
		//$temp.addEventListener('click', handleLoginLink);
		//$tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'Home', msg:'Home' }));
		//$temp = document.getElementById('topNav__Home');
		//$temp.addEventListener('click', redirectToHome);
	}
	  
	function redirectToLogin() {
		EventEmitter.emit('AdminLogin:unmount');
		EventEmitter.emit('AdminLogin:mount');
	}
	  
	function redirectToHome() {									
		EventEmitter.emit('AdminLogin:unmount');
		window.location.replace('Admin-Home.php');
	}
	  
	function handleLoginLink() {
		EventEmitter.emit('AdminLogin:unmount');
		EventEmitter.emit('AdminLogin:mount');
	}
	  
	function handleHomeLink() {
		EventEmitter.emit('AdminLogin:unmount');
		EventEmitter.emit('HomePage:mount');
	}

	//Process to follow when "Login/Submit" button is pressed
	function handleSubmit(event) {
		event.preventDefault()
		var $inputs = $container.getElementsByTagName('input');
		startLoading()
		
		//Uses Cognito JS to attempt authentication
		Cognito.logIn($inputs.email.value, $inputs.password.value).then(function(result){			  
			stopLoading()
			addAlert({
				type: 'success',
				message: 'Log in successful! Redirecting...'
			})
			//Sets required tokens and authentication methods to save necessary credentials for access to the rest of the app
			Cognito.isAuthenticated();
			
			//Redirects to the authenticated landing page after a short pause
			setTimeout(redirectToHome, 150);
					   
		})
		//If any errors are encountered...
		.catch(function(error) {
			$fills = $container.getElementsByClassName('Control__input');
			$fills[1].value=''; //Clear Password from page
			stopLoading();
			console.error(error.message);
		  
			// If the user needs to confirm their acconut, switch to the confirmation form page.
			if (error.message === 'User is not confirmed.') {
				EventEmitter.emit('ConfirmForm:mount', {
					email: $inputs.email.value,
				});
				EventEmitter.emit('LoginForm:unmount');
				return;
			}
		    else if(error.message=="Missing required parameter USERNAME")
			{
				addAlert({
					type: 'error',
					message: "Invalid Username/Email"
				})
			}
			else{
			//Print Error to On-page Alert area
				addAlert({
					type: 'error',
					message: error.message,
				})
			}
		})
	}
	  
	EventEmitter.on('AdminLogin:mount', function(message) {
		Cognito.isNotAuthenticated()
		.then(function() {
		  $container.innerHTML = tmpl('AdminLogin', {})
		  $form = $container.getElementsByClassName('form')[0];
		  $title = $container.getElementsByClassName('title')[0];
		  $form.addEventListener('submit', handleSubmit);	
		  
		  setupTNLeft();
		  setupTNRight();
		  $root.appendChild($container);

		  if (message) {
			addAlert(message);
		  }
		})
		.catch(redirectToHome)
	  })
	 
	  EventEmitter.on('AdminLogin:unmount', function() {
		$form && $form.removeEventListener('submit', handleSubmit);
		$temp = document.getElementById('topNav__Login');
		$temp && $temp.removeEventListener('click', handleLoginLink);
		$temp = document.getElementById('topNav__Home');
		$temp && $temp.removeEventListener('click', handleHomeLink);
		while ($tnRight.firstChild) {
			$tnRight.removeChild($tnRight.firstChild);
		}
		$container.remove();
  })
})(
  window.EventEmitter, 
  window.tmpl, 
  window.Cognito
)
