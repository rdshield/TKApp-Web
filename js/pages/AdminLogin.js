(function(EventEmitter, tmpl, Cognito){
	/* Admin Login Form */
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
	  
	function setupTNLeft(){	}  

	function setupTNRight(){
		$tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'Login', msg:'Login' }));
		$temp = document.getElementById('topNav__Login');
		$temp.addEventListener('click', handleLoginLink);
		$tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'Home', msg:'Home' }));
		$temp = document.getElementById('topNav__Home');
		$temp.addEventListener('click', redirectToHome);
	}
	  
	function redirectToLogin() {
		EventEmitter.emit('AdminLogin:unmount');
		EventEmitter.emit('AdminLogin:mount');
	}
	  
	function redirectToHome() {
		EventEmitter.emit('AdminLogin:unmount');
		EventEmitter.emit('AdminHome:mount');
	}
	  
	function handleLoginLink() {
		EventEmitter.emit('AdminLogin:unmount');
		EventEmitter.emit('AdminLogin:mount');
	}
	  
	function handleHomeLink() {
		EventEmitter.emit('AdminLogin:unmount');
		EventEmitter.emit('HomePage:mount');
	}

	function handleSubmit(event) {
		event.preventDefault()
		var $inputs = $container.getElementsByTagName('input');
		startLoading()
		Cognito.logIn($inputs.email.value, $inputs.password.value)
		.then(function(result) {
		  stopLoading()
		  addAlert({
			type: 'success',
			message: 'Log in successful! Redirecting...'
		  })
		  setTimeout(redirectToHome, 50) 
		  console.log(result)
		})
		.catch(function(error) {
			$fills = $container.getElementsByClassName('Control__input');
			$fills[1].value='';
			stopLoading();
			console.log(error.message)
			addAlert({
				type: 'error',
				message: error.message,
			})
			$fills[0].value='';
			console.error(error)
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
