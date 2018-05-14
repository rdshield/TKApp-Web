(function(EventEmitter, tmpl, Cognito) {
	var $root = document.getElementById('root'),
		$container = document.createElement('div'),
		$tnLeft = document.getElementById('topNavLeft'),
		$tnRight = document.getElementById('topNavRight'),
		$alert,$button,$link,$form,$title;
	  
	function startLoading() {
		removeAlert();
		$button = $container.querySelectorAll('input[type=submit]')[0];
		$button.disabled = true;
		$button.value = 'Loading...';
	}

	function stopLoading() {
		$button.disabled = false;
		$button.value = 'Confirm';
	}

	function addAlert(options) {
		removeAlert();
		$title.insertAdjacentHTML('afterend', tmpl('Alert', options));
	}

	function removeAlert() {
		$alert = $container.getElementsByClassName('Alert')[0];
		$alert && $alert.remove();
	}
  
	function handleLoginLink(event) {
		event.preventDefault();
		redirectToLogin()
	}

	function redirectToLogin(message) {
		EventEmitter.emit('pwResetForm:unmount');
		EventEmitter.emit('LoginForm:mount', message);
	}

	function handleSubmit(event) {
		event.preventDefault();
		username = document.getElementById('email').value.toLowerCase();
		startLoading();
		Cognito.forgotPassword(username).then(function() {	
			
			setPopUp("Confirm Account & New Password",{email: username});
			stopLoading();
		})
	}
  
	function handleConfirm(event) {
		event.preventDefault();
		
		if ($inputs.password.value !== $inputs.repeatPassword.value) {
		  addAlert({
			type: 'error',
			message: 'Passwords do not match!',
		  })
		  console.log('Passwords do not match!')
		  return;
		}
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
		
		$('#pwConfirmSubmit').on('submit',function() {
			if (pass1.value !== pass2.value) {
				addAlert({
					type: 'error',
					message: 'Passwords do not match!',
				})
			console.log('Passwords do not match!')
			return;
			} else {
				Cognito.confirmPassword(username, conf.value, pass1.value).then( function() {
					redirectToLogin("Your password has been successfully reset");
			}).catch(function (error) { console.log(error)})
			}
		})
				
		// When the user clicks on <span> (x), close the modal	
		span.onclick = function() { 
			modal.style.display = "none"; 
			$(document.getElementById('modalTitle')).remove();
		}
	}
 
	EventEmitter.on('pwResetForm:mount', function(options) {
		// email = options.email;
		$container.innerHTML = tmpl('pwdResetForm', {})
		$form = $container.getElementsByClassName('form')[0];
		$title = $container.getElementsByClassName('title')[0];
		$form.addEventListener('submit', handleSubmit);
		$tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'b2Login', msg:'Back to Login' }) );
		$b = document.getElementById('topNav__b2Login');
		$b.addEventListener('click', handleLoginLink);
		$root.appendChild($container);
	})

	EventEmitter.on('pwResetForm:unmount', function() {
		$form.removeEventListener('submit', handleSubmit);
		$b = document.getElementById('topNav__b2Login');
		$b && $b.removeEventListener('click', handleLoginLink);
		while ($tnRight.firstChild) {
			$tnRight.removeChild($tnRight.firstChild);
		}
		$container.remove()
	})
})(window.EventEmitter, window.tmpl, window.Cognito)
