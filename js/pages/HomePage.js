(function(EventEmitter, tmpl, Cognito){
  /* HomePage */
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
  }

  function stopLoading() {
  }

  function addAlert(options) {
    $title.insertAdjacentHTML('afterend', tmpl('Alert', options));
    $close = $container.getElementsByClassName('Alert__close')[0];
    $close.addEventListener('click', handleClose);
  }

  function handleClose(event) {
    event.target.parentNode.remove()
  }
  
  function handleSignOut(event) {
    event.preventDefault();
    Cognito.signOut()
    .then(function() {
      addAlert({
        type: 'success',
        message: 'Logging out. Please wait...'
      })
      setTimeout(redirectToLogin('You have been successfully logged out.', 3000)
	}
    .catch(function(error) {
      addAlert({
        type: 'error',
        message: error.message,
      })
      console.error(error);
    })
  }
  
  function redirectToLogin(message) {
    EventEmitter.emit('HomePage:unmount');
    EventEmitter.emit('LoginForm:mount', message);
  }

  function removeAlert() {
    $alert = $container.getElementsByClassName('Alert')[0];
    $alert && $alert.remove();
    $close && $close.removeEventListener('click', handleClose);
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
      setTimeout(redirectToWelcomePage, 50)
      console.log(result)
    })
    .catch(function(error) {
      stopLoading();
      console.log(error.message)
      // If the user needs to enter its confirmation code switch to the
      // confirmation form page.
      if (error.message === 'User is not confirmed.') {
        EventEmitter.emit('ConfirmForm:mount', {
          email: $inputs.email.value,
        });
        EventEmitter.emit('LoginForm:unmount');
        return;
      }
      addAlert({
        type: 'error',
        message: error.message,
      })
      console.error(error)
    })
  }

  EventEmitter.on('HomePage:mount', function(message) {
    Cognito.isAuthenticated()
    .then(function() {
      $container.innerHTML = tmpl('HomePage', {})
      $link = $container.getElementsByClassName('Control__link')[0];
      $form = $container.getElementsByClassName('form')[0];
      $title = $container.getElementsByClassName('title')[0];
      $link.addEventListener('click', handleSignupLink);
      $form.addEventListener('submit', handleSubmit);
	  $tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'Logout', msg:'Logout' }) );
	  $b = document.getElementById('topNav__Logout');
	  $b.addEventListener('click', HandleSignOut);
      $root.appendChild($container);
      $root.appendChild($container);
      if (message) {
        addAlert(message);
      }
    })
    .catch(redirectToLogin("Please login.")
  })

  EventEmitter.on('HomePage:unmount', function() {
    $link && $link.removeEventListener('click', handleSignupLink);
    $form && $form.removeEventListener('submit', handleSubmit);
    $container.remove();
  })
})(window.EventEmitter, window.tmpl, window.Cognito)
