(function(EventEmitter, tmpl, Cognito){
	/* Login Form */
	var $root = document.getElementById('root'), 			//Where all forms are "inserted"
		$container = document.createElement('div'),			//Temporary space for Form on build
		$tnLeft = document.getElementById('topNavLeft'),	//Reference Point for Top-Left Nav Bar
		$tnRight = document.getElementById('topNavRight'),	//Reference Point for Top-Right Nav Bar
		$title,	$alert,	$button, $form,	$link, $forgotLink;
		
	//Functions for On-screen Alerts	
	function addAlert(options) {
		$title.insertAdjacentHTML('afterend', tmpl('Alert', options));
	}
	
	function removeAlert() {
		$alert = $container.getElementsByClassName('Alert')[0];
		$alert && $alert.remove();
	}

	//Setup for Left/Right Top Navigation bar
	function setupTNLeft(){}  
	function setupTNRight(){} 
	
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

	/**********Functions for specific actions on this page**********/
  
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
	function handleLoginLink(msg) {
		EventEmitter.emit('LoginForm:unmount');
		if(msg==null) {	EventEmitter.emit('LoginForm:mount'); }
		else 		  { EventEmitter.emit('LoginForm:mount',msg); }
	}
  
	//Navigation to the "Password Reset" screen
	function handlePwReset() {
		EventEmitter.emit('LoginForm:unmount');
		EventEmitter.emit('pwResetForm:mount');
	}
  
	//Process to follow when "Login/Submit" button is pressed
	function handleSubmit(event) {
		event.preventDefault();
		var $inputs = $container.getElementsByTagName('input');
		startLoading()
		
		//Uses Cognito JS to attempt authentication
		Cognito.logIn($inputs.email.value, $inputs.password.value).then(function(result) {
			stopLoading();
			addAlert({
				type: 'success',
				message: 'Log in successful! Redirecting to Home Page...'
			})
			Cognito.isAuthenticated();
			setTimeout(redirectToHome, 150);
		}).catch(function(error) {
			//If any errors are encountered...
			$fills = $container.getElementsByClassName('Control__input');
			$fills[1].value=''; //Clear Password from page
			stopLoading();
			console.error(error.message);
		  
			// If the user needs to confirm their acconut, switch to the confirmation form page.
			if (error.message ==="User is not confirmed.") {
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
					message: "Please enter your Username/Email"
				})
			}
			else if(error.message=="Password reset required for the user")
			{
				setPopUp("Confirm New Password",{email: $inputs.email.value});	
				stopLoading();
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
  
	function setPopUp(title, params=null) {
		var modal = document.getElementById('myModal');
		modal.style.display = "block";
		var span = document.getElementsByClassName("close")[0];
		var $header = document.getElementsByClassName("modal-header")[0];
		var $body = document.getElementsByClassName("modal-body")[0];
		var $footer = document.getElementsByClassName("modal-footer")[0];
		
		$header.insertAdjacentHTML('beforeend',"<h3 id='modalTitle'> "+title+" </h3>")
		$body.innerHTML = tmpl('pwdResetConfirm', {})
				
		var username = params.email;
		var conf = document.getElementById('confirmCode');
		var pass1 = document.getElementById('newPass1');
		var pass2 = document.getElementById('newPass2');
		
		var $submit = document.getElementById('pwConfirmSubmit');	
		$submit.onclick = function() {
			if (pass1.value !== pass2.value) {
				addAlert({
					type: 'error',
					message: 'Passwords do not match!',
				})
				console.log('Passwords do not match!')
				return;
			} else {
				Cognito.confirmPassword(username, conf.value, pass1.value).then( function() {
					handleLoginLink("Your password has been successfully reset");
			}).catch(function (error) { console.log(error)})
			}
		}
				
		// When the user clicks on <span> (x), close the modal	
		span.onclick = function() { 
			modal.style.display = "none"; 
			$(document.getElementById('modalTitle')).remove();
		}
	}
  
	//Process to run when Login form is called for display (EventEmitter.emit('LoginForm:Mount'))
	EventEmitter.on('LoginForm:mount', function(message) {
		//Check if account is (not) authenticated
		Cognito.isNotAuthenticated().then(function() {
			$container.innerHTML = tmpl('LoginForm', {})
			$link = $container.getElementsByClassName('Control__link')[0];
			
			//Setup Listeners for on-screen elements
			$forgotLink = $container.getElementsByClassName('pwReset')[0];
			$form = $container.getElementsByClassName('form')[0];
			$title = $container.getElementsByClassName('title')[0];
			$link.addEventListener('click', handleSignupLink);
			$forgotLink.addEventListener('click', handlePwReset);
			$form.addEventListener('submit', handleSubmit);	 
			$root.appendChild($container); //Append Login Form to the displayed picture
			
			if (message) {	addAlert(message);	} //Print message to Alert section, if one was passed
		}) .catch(function(error) {
				console.log(error);
				redirectToHome();
		})   //If user is already authenticated, redirect to Home Page
	})
 
	//Process to run when Login form is called for removal (EventEmitter.emit('LoginForm:UnMount'))
	EventEmitter.on('LoginForm:unmount', function() {
		//Remove Event Listeners
		$link && $link.removeEventListener('click', handleSignupLink);
		$forgotLink && $forgotLink.removeEventListener('click', handlePwReset);
		$form && $form.removeEventListener('submit', handleSubmit);
		
		//Remove page container
		$container.remove();
	})
})(window.EventEmitter,window.tmpl,window.Cognito,)