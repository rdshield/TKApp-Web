(function(EventEmitter, tmpl, Cognito){
	/* Login Form */
	var $root = document.getElementById('root'), 			//Where all forms are "inserted"
		$container = document.createElement('div'),			//Temporary space for Form on build
		$tnLeft = document.getElementById('topNavLeft'),	//Reference Point for Top-Left Nav Bar
		$tnRight = document.getElementById('topNavRight'),	//Reference Point for Top-Right Nav Bar
		$title,
		$alert,
		$button,
		$form,
		$link;
		
	//Functions for On-screen Alerts	
	function addAlert(options) {
		$title.insertAdjacentHTML('afterend', tmpl('Alert', options));
	}
	
	function removeAlert() {
		$alert = $container.getElementsByClassName('Alert')[0];
		$alert && $alert.remove();
	}

	//Setup for Left/Right Top Navigation bar
	function setupTNLeft(){
		//$tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LHome' , msg:'Home'  }));
		//$c = document.getElementById('topNav__LHome');
		//$c.addEventListener('click', handleHomeLink);
		//$tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LChild', msg:'My Children' }));
		//$b = document.getElementById('topNav__LChild');
		//$b.addEventListener('click', handleChildLink);
	}  
	
	function setupTNRight(){
		// $tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'Logout', msg:'Logout' }));
		// $b = document.getElementById('topNav__Logout');
		// $b.addEventListener('click', handleLogOut);
	} 
	
	//Locking down the Submit button while work is being done in the background
	function startLoading() {
		removeAlert();
		$button = $container.querySelectorAll('input[type=submit]')[0];
		$button.disabled = true;
		$button.value = 'Loading...';
	}

	//Unlocking the Submit button when work is done
	function stopLoading() {
		$button.disabled = false;
		$button.value = 'Login';
	}

	//Functions for specific actions on this page
  
	//Redirect to the home page (Usually after successful authentication or when visiting Login after being authenticated)
	function redirectToHome() {
		//console.log("Redirecting to Home Page");
		EventEmitter.emit('LoginForm:unmount');
		window.location.replace('home.php');
	}
  
	//Navigation to the "User Sign-up" screen
	function handleSignupLink(event) {
		event.preventDefault();
		EventEmitter.emit('LoginForm:unmount')
		EventEmitter.emit('SignupForm:mount')
	}

	//Used to Reset Login Screen back to original view on load
	function handleLoginLink() {
		EventEmitter.emit('LoginForm:unmount');
		EventEmitter.emit('LoginForm:mount');
	}
  
	//Navigation to the "Password Reset" screen
	function handlePwReset() {
		EventEmitter.emit('LoginForm:unmount');
		EventEmitter.emit('pwResetForm:mount');
	}
  
	//Process to follow when "Login/Submit" button is pressed
	function handleSubmit(event) {
		event.preventDefault()
		var $inputs = $container.getElementsByTagName('input');
		startLoading()
		
		//Uses Cognito JS to attempt authentication
		Cognito.logIn($inputs.email.value, $inputs.password.value).then(function(result) {
			stopLoading()
			addAlert({
				type: 'success',
				message: 'Log in successful! Redirecting to Home Page...'
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
			if(error.message=="Missing required parameter USERNAME")
			{
				addAlert({
					type: 'error',
					message: "Please enter your Username/Email"
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
  
	//Process to run when Login form is called for display (EventEmitter.emit('LoginForm:Mount'))
	EventEmitter.on('LoginForm:mount', function(message) {
		//Check if account is (not) authenticated
		Cognito.isNotAuthenticated().then(function() {
			//Load the Login Template
			$container.innerHTML = tmpl('LoginForm', {})
			//Connect to the Form's controller
			$link = $container.getElementsByClassName('Control__link')[0];
			
			//Setup Listeners for on-screen elements
			$forgotLink = $container.getElementsByClassName('pwReset')[0];
			$form = $container.getElementsByClassName('form')[0];
			$title = $container.getElementsByClassName('title')[0];
			$link.addEventListener('click', handleSignupLink);
			$forgotLink.addEventListener('click', handlePwReset);
			$form.addEventListener('submit', handleSubmit);	 

			//Append Login Form to the displayed picture
			$root.appendChild($container);
			
			//Print message to Alert section, if one was passed
			if (message) {
				addAlert(message);
			}
		}) .catch(redirectToHome)   //If user is already authenticated, redirect to Home Page
	})
 
	//Process to run when Login form is called for removal (EventEmitter.emit('LoginForm:UnMount'))
	EventEmitter.on('LoginForm:unmount', function() {
		//Remove Event Listeners
		$link && $link.removeEventListener('click', handleSignupLink);
		//$forgotLink && $forgotLink.removeEventListener('click', handlePwReset);
		$form && $form.removeEventListener('submit', handleSubmit);
		// $b = document.getElementById('topNav__Login');
		// $b && $b.removeEventListener('click', handleLoginLink);
		
		//Remove page container
		$container.remove();
	})
})(
  window.EventEmitter, 
  window.tmpl, 
  window.Cognito,
)
