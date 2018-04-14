(function(EventEmitter, tmpl, Cognito) {

  var $root = document.getElementById('root'), 
    $container = document.createElement('div'),
	$tnLeft = document.getElementById('topNavLeft'),
	$tnRight = document.getElementById('topNavRight'),
    $button,
    $link,
    $title,
    $close,
    $form;

  function startLoading() {
    removeAlert()
    $button = $container.querySelectorAll('input[type=submit]')[0];
    $button.disabled = true;
    $button.value = 'Loading...';
  }

  function stopLoading() {
    $button.disabled = false;
    $button.value = 'Sign me up!'
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
  
  function redirectToLogin() {
	EventEmitter.emit('SignupForm:unmount');
    EventEmitter.emit('LoginForm:mount');
  }

  function handleLoginLink(event) {
    event.preventDefault();
    EventEmitter.emit('SignupForm:unmount');
    EventEmitter.emit('LoginForm:mount');
  }

  function handleSubmit(event) {
	event.preventDefault()
    var $inputs = $container.getElementsByTagName('input'), attributes;
    if ($inputs.password.value !== $inputs.repeatPassword.value) {
	  addAlert({
        type: 'error',
        message: 'Passwords do not match!',
      })
      console.log('Passwords do not match!')
      return;
    }
    startLoading()
    Cognito.signUp($inputs.email.value, $inputs.password.value)
    .then(function(result) {
      stopLoading();
      console.log(result);
	  addAlert({
        type: 'success',
        message: 'Your request has been received. Check your email for a validation key. Redirecting back to login...',
      })
	  setTimeout(redirectToLogin, 3500);	  
    })
    .catch(function(error) {
	  $fills = $container.getElementsByClassName('Control__input');
	  $fills[1].value='';
	  $fills[2].value='';
      stopLoading();
      addAlert({
        type: 'error',
        message: error.message,
      })
      console.error(error)
    })
  }

  EventEmitter.on('SignupForm:mount', function() {
    Cognito.isNotAuthenticated()
    .then(function() {
      $container.innerHTML = tmpl('SignupForm', {})
      $form = $container.getElementsByTagName('form')[0]
      $title = $container.getElementsByClassName('title')[0]
      $form.addEventListener('submit', handleSubmit)
	  $tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'b2Login', msg:'Back to Login' }) );
	  $b = document.getElementById('topNav__b2Login');
	  $b.addEventListener('click', handleLoginLink);
      $root.appendChild($container)
    })
    .catch(function() {
      EventEmitter.emit('SignupForm:unmount');
      EventEmitter.emit('Welcome:mount');
    })
  })

  EventEmitter.on('SignupForm:unmount', function() {
    $form.removeEventListener('submit', handleSubmit)
	$b = document.getElementById('topNav__b2Login');
	$b && $b.removeEventListener('click', handleLoginLink);
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
