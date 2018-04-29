(function(EventEmitter, tmpl, Cognito) {
  var email,
    $root = document.getElementById('root'),
    $container = document.createElement('div'),
	$tnLeft = document.getElementById('topNavLeft'),
	$tnRight = document.getElementById('topNavRight'),
    $alert,
    $button,
    $link,
    $form,
    $title,
    $close;

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

  function handleLoginLink(event) {
    event.preventDefault();
    redirectToLogin()
  }

  function redirectToLogin(message) {
    EventEmitter.emit('pwResetForm:unmount');
    EventEmitter.emit('LoginForm:mount', message);
  }
  
  function handleResendCode(event) {
    event.preventDefault();
    Cognito.resendConfirmationCode()
    .then(function(result) {
      addAlert({
        type: 'info',
        message: 'A new confirmation code was sent.'
      });
      console.log(result);
    })
    .catch(function(error) {
      addAlert({
        type: 'error',
        message: error.message,
      });
      console.error(error);
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
	username = document.getElementById('email').value.toLowerCase();
    startLoading();
    Cognito.forgotPassword(username);
	stopLoading();
	redirectToLogin();
  }
  
  function handleConfirm(event) {
	event.preventDefault();
	console.log("HANDLE CONFIRM");
	var $inputs = $container.getElementsByTagName('input');
	if ($inputs.password.value !== $inputs.repeatPassword.value) {
	  addAlert({
        type: 'error',
        message: 'Passwords do not match!',
      })
      console.log('Passwords do not match!')
      return;
    }
	cognitoUser.confirmPassword(verificationCode, newPassword, {
                onSuccess() {
                    console.log('Password confirmed!');
                },
                onFailure(err) {
                    console.log('Password not confirmed!');
                }
	
	})
  }
 
  EventEmitter.on('pwResetForm:mount', function(options) {
     // email = options.email;
      $container.innerHTML = tmpl('pwdResetForm', {})
      $resend = $container.getElementsByClassName('Control__link')[0]
      $form = $container.getElementsByClassName('form')[0];
      $title = $container.getElementsByClassName('title')[0];
      $resend.addEventListener('click', handleResendCode);
      $form.addEventListener('submit', handleSubmit);
	  $tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'b2Login', msg:'Back to Login' }) );
	  $b = document.getElementById('topNav__b2Login');
	  $b.addEventListener('click', handleLoginLink);
      $root.appendChild($container);
    })

  EventEmitter.on('pwResetForm:unmount', function() {
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
