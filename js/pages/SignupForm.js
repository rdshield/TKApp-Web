(function(EventEmitter, tmpl, Cognito) {

	var $root = document.getElementById('root'), 
		$container = document.createElement('div'),
		$tnLeft = document.getElementById('topNavLeft'),
		$tnRight = document.getElementById('topNavRight'),
		$button,$link,$title,$form;

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
	}

	function removeAlert() {
		$alert = $container.getElementsByClassName('Alert')[0];
		$alert && $alert.remove();
	}

	function setupTNLeft(){	}  

	function setupTNRight(){
		$tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'b2Login', msg:'Back to Login' }) );
		$b2Login = document.getElementById('topNav__b2Login');
		$b2Login.addEventListener('click', handleLoginLink);
	}

	function handleLoginLink(event) {
		if(event!=null){ event.preventDefault(); }
		EventEmitter.emit('SignupForm:unmount');
		EventEmitter.emit('LoginForm:mount');
	}

	function handleSubmit(event) {
		if(event!=null){ event.preventDefault(); }
		var $inputs = $container.getElementsByTagName('input'), attributes;
		if ($inputs.password.value !== $inputs.repeatPassword.value) {
			addAlert({
				type: 'error',
				message: 'Passwords do not match!',
			})
			console.log('Passwords do not match!')
			return;
		}
		if($inputs.address == null)  { $inputs.address.value = '';  }
		if($inputs.phoneNum == null) { $inputs.phoneNum.value = '';	}		
		var params = {
			email: $inputs.email.value,
			password: $inputs.password.value,
			firstName: $inputs.fName.value,
			lastName: $inputs.lName.value,
			address: $inputs.address.value,
			city: $inputs.city.value,
			zipCode: $inputs.zipCode.value,
			phoneNum: $inputs.phoneNum.value,
		}	
		startLoading()
		Cognito.signUp(params).then(function(result) {
			stopLoading();
		    addAlert({
				type: 'success',
				message: 'Your request has been received. Check your email for a validation key. Redirecting back to login...',
			})
			setTimeout(handleLoginLink, 3500);	  
		}).catch(function(error) {
			stopLoading();
			$fills = $container.getElementsByClassName('Control__input');
			$fills[1].value='';
			$fills[2].value='';
			addAlert({
				type: 'error',
				message: error.message,
			})
			console.error(error)
		})
	}

	EventEmitter.on('SignupForm:mount', function() {
		Cognito.isNotAuthenticated().then( function() {
			$container.innerHTML = tmpl('SignupForm', {});
			$form = $container.getElementsByTagName('form')[0];
			$title = $container.getElementsByClassName('title')[0];
			$form.addEventListener('submit', handleSubmit)
			setupTNLeft();
			setupTNRight();
			$root.appendChild($container);
			$myInput = document.getElementById('password');
			$myInput2 = document.getElementById('repeatPassword');
			$message = document.getElementById('message');
			$number = document.getElementById('number');
			$length = document.getElementById('length');
			$match = document.getElementById('match');
			
/* $myInput = document.getElementById('password') || document.getElementById('repeatPassword')*/	
			
			
			$myInput.onfocus = function() { $message.style.display = "block"; }
			$myInput2.onfocus = function() { $message.style.display = "block"; }
			$myInput.onblur = function() { $message.style.display = "none"; }
			$myInput2.onblur = function() { $message.style.display = "none"; }

			$myInput.onkeyup = function() { 
			//Validate number
				var numbers = /[0-9]/g;
				if($myInput.value.match(numbers)) {  
				$number.classList.remove("invalid");
				$number.classList.add("valid");
			  } else {
				$number.classList.remove("valid");
				$number.classList.add("invalid");
				}
			// Validate length
				if($myInput.value.length >= 8) {
				$length.classList.remove("invalid");
				$length.classList.add("valid");
				} else {
				$length.classList.remove("valid");
				$length.classList.add("invalid");
				}
			//Validate password match
				if($myInput.value == $myInput2.value && $myInput.value != null){
				$match.classList.remove("invalid");
				$match.classList.add("valid");
				} else {
				$match.classList.remove("valid");
				$match.classList.add("invalid");
			}
			}
			$myInput2.onkeyup = function() { 
				var numbers = /[0-9]/g;
				if($myInput2.value.match(numbers)) {  
				console.log('Got it')
				$number.classList.remove("invalid");
				$number.classList.add("valid");
				} else {
				$number.classList.remove("valid");
				$number.classList.add("invalid");
			} 
				// Validate length
				if($myInput2.value.length >= 8) {
				$length.classList.remove("invalid");
				$length.classList.add("valid");
				} else {
				$length.classList.remove("valid");
				$length.classList.add("invalid");
				}
			//Validate password match
				if($myInput2.value == $myInput.value & $myInput2.value != null){
				$match.classList.remove("invalid");
				$match.classList.add("valid");
				} else {
				$match.classList.remove("valid");
				$match.classList.add("invalid");
			}				
			}
		}).catch(function(err) {
			console.log(err)
			EventEmitter.emit('SignupForm:unmount');
			EventEmitter.emit('Login:mount');
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
})(window.EventEmitter,window.tmpl,window.Cognito)