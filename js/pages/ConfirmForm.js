(function(EventEmitter, tmpl, Cognito) {
  var email,
    $root = document.getElementById('root'),
    $container = document.createElement('div'),
	$tnLeft = document.getElementById('topNavLeft'),
	$tnRight = document.getElementById('topNavRight'),
    $alert, $button, $link, $form, $title;

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

	function handleResendCode(event) {
		event.preventDefault();
		Cognito.resendConfirmationCode().then(function(result) {
			addAlert({
				type: 'info',
				message: 'A new confirmation code was sent.'
			});
        }).catch(function(error) {
			addAlert({
				type: 'error',
				message: error.message,
			});
			console.error(error);
		})
	}

	function handleLoginLink(event) {
		event.preventDefault();
		redirectToLogin();
	}

	function redirectToLogin(message) {
		EventEmitter.emit('ConfirmForm:unmount');
		EventEmitter.emit('LoginForm:mount', message);
	}

	function handleSubmit(event) {
		event.preventDefault();
		var $inputs = $container.getElementsByTagName('input');
		startLoading();
		Cognito.confirm(email, $inputs.code.value).then(function(result) {
			stopLoading();
			addAlert({
				type: 'success',
				message: 'Email confirmation done. Redirecting',
			})
			setTimeout(function(){
				redirectToLogin({
					type: 'info',
					message: 'Please re-enter your credentials.'
				})
			}, 2500);
		}).catch(function(error) {
			stopLoading();
			addAlert({
				type: 'error',
				message: error.message,
			});
			console.log(error);
		})
	}
 
	EventEmitter.on('ConfirmForm:mount', function(options) {
		Cognito.isNotAuthenticated().then(function() {
			email = options.email;
			$container.innerHTML = tmpl('ConfirmForm', {})
			$resend = $container.getElementsByClassName('Control__link')[0]
			$form = $container.getElementsByClassName('form')[0];
			$title = $container.getElementsByClassName('title')[0];
			addAlert({
				type: 'warning',
				message: 'You must confirm your email address.',
			})
			$resend.addEventListener('click', handleResendCode);
			$form.addEventListener('submit', handleSubmit);
			$tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'b2Login', msg:'Back to Login' }) );
			$b = document.getElementById('topNav__b2Login');
			$b.addEventListener('click', handleLoginLink);
			$root.appendChild($container);
		}).catch(function() {
			EventEmitter.emit('ConfirmForm:unmount');
			redirectToLogin();
		})
	})

	EventEmitter.on('ConfirmForm:unmount', function() {
		$resend.removeEventListener('click', handleResendCode);
		$form.removeEventListener('submit', handleSubmit);
		$b = document.getElementById('topNav__b2Login');
		$b && $b.removeEventListener('click', handleLoginLink);
		while ($tnRight.firstChild) {
			$tnRight.removeChild($tnRight.firstChild);
		}
		$container.remove()
	})
})(window.EventEmitter, window.tmpl, window.Cognito)
