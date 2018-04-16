(function(EventEmitter, tmpl, Cognito){
  /* Login Form */
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
  
  function redirectToLogin() {
	EventEmitter.emit('LoginForm:unmount');
    EventEmitter.emit('LoginForm:mount');
  }
  
  function redirectToHome() {
	EventEmitter.emit('LoginForm:unmount');
    EventEmitter.emit('HomePage:mount');
  }
  
  
  function handleSignupLink(event) {
    event.preventDefault();
    EventEmitter.emit('LoginForm:unmount')
    EventEmitter.emit('SignupForm:mount')
  }

  function handleLoginLink() {
    EventEmitter.emit('LoginForm:unmount');
    EventEmitter.emit('LoginForm:mount');
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
      // If the user needs to enter its confirmation code switch to the
      // confirmation form page.
      if (error.message === 'User is not confirmed.') {
        EventEmitter.emit('ConfirmForm:mount', {
          email: $inputs.email.value,
        });
		$fills[0].value='';
        EventEmitter.emit('LoginForm:unmount');
        return;
      }
      addAlert({
        type: 'error',
        message: error.message,
      })
  	  $fills[0].value='';
      console.error(error)
    })
  }
  
  EventEmitter.on('LoginForm:mount', function(message) {
    Cognito.isNotAuthenticated()
    .then(function() {
      $container.innerHTML = tmpl('LoginForm', {})
      $link = $container.getElementsByClassName('Control__link')[0];
      $form = $container.getElementsByClassName('form')[0];
      $title = $container.getElementsByClassName('title')[0];
      $link.addEventListener('click', handleSignupLink);
      $form.addEventListener('submit', handleSubmit);	  
	  $tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'Login', msg:'Login' }));
	  $b = document.getElementById('topNav__Login');
	  $b.addEventListener('click', handleLoginLink);
	  $tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'Home' , msg:'Home'  }));
	  $c = document.getElementById('topNav__Home');
	  $c.addEventListener('click', redirectToHome);
      $root.appendChild($container);

      if (message) {
        addAlert(message);
      }
    })
    .catch(redirectToHome)
  })
 
  EventEmitter.on('LoginForm:unmount', function() {
    $link && $link.removeEventListener('click', handleSignupLink);
    $form && $form.removeEventListener('submit', handleSubmit);
	$b = document.getElementById('topNav__Login');
	$b && $b.removeEventListener('click', handleLoginLink);
	$c = document.getElementById('topNav__Home');
	$c && $c.removeEventListener('click', redirectToHome);
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
