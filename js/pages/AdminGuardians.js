(function(EventEmitter, tmpl, Cognito, DBClient,){
	/* Admin Guardians Page */
	var $root = document.getElementById('root'), 
		$container = document.createElement('div'),
		$tnLeft = document.getElementById('topNavLeft'),
		$tnRight = document.getElementById('topNavRight'),
		$title,
		$button,
		$form,
		$link;


	function setupTNLeft(){
/* 		$tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LHome' , msg:'Home'  }));
		$temp = document.getElementById('topNav__LHome');
		$temp.addEventListener('click', handleHomeLink); */
		$tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LChallenges' , msg:'Challenges'  }));
		$temp = document.getElementById('topNav__LChallenges');
		$temp.addEventListener('click', handleChallengeLink);
		$tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LUsers', msg:'Guardians' }));
		$temp = document.getElementById('topNav__LUsers');
		$temp.addEventListener('click', handleUserLink);
		$tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LAdmins', msg:'Admin Settings' }));
		$temp = document.getElementById('topNav__LAdmins');
		$temp.addEventListener('click', handleSettingsLink);
	}  

	function setupTNRight(){
		$tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'Logout', msg:'Logout' }));
		$temp = document.getElementById('topNav__Logout');
		$temp.addEventListener('click', handleLogOut);
	}

	function handleChallengeLink() {
		EventEmitter.emit('AdminGuardians:unmount');
		EventEmitter.emit('AdminChallenges:mount');
	}
  
	function handleUserLink() {
		EventEmitter.emit('AdminGuardians:unmount');
		EventEmitter.emit('AdminGuardians:mount');
	}
	
	function handleHomeLink() {
		EventEmitter.emit('AdminGuardians:unmount');
		EventEmitter.emit('AdminHome:mount');
	}
  
	function handleSettingsLink() {
		EventEmitter.emit('AdminGuardians:unmount');
		EventEmitter.emit('AdminSettings:mount');
	}
  
	function handleLogOut() {
		EventEmitter.emit('AdminGuardians:unmount');
		Cognito.signOut();
		window.location.replace("./admin-login.html","Admin Login") 
	}
	
	function setPopUp(title, params=null) {
		var modal = document.getElementById('myModal');
		modal.style.display = "block";
		var span = document.getElementsByClassName("close")[0];
		var $header = document.getElementsByClassName("modal-header")[0];
		var $body = document.getElementsByClassName("modal-body")[0];
		var $footer = document.getElementsByClassName("modal-footer")[0];
		
		$header.insertAdjacentHTML('beforeend',"<h3 id='modalTitle'> "+title+" </h3>")
		$body.innerHTML = tmpl('GuardianEdit', {})
		$footer.innerHTML = '<button id="addRowSubmit" type="button">Save</button>';
		
		var $userId, $count,
			$gAccount = document.getElementById('gName'),
			$gFName	  = document.getElementById('gFName'),
			$gLName   = document.getElementById('gLName'),
			$gLAddress= document.getElementById('gAddress'),
			$gCity    = document.getElementById('gCity'),
			$gState   = document.getElementById('gState'),
			$gZip     = document.getElementById('gZip'),
			$gPhone   = document.getElementById('gPhone');

		if(params != null) {
			$userId = params.userId,
			$count = params.userCount,
			$gAccount.innerHTML = params.email_address;
			$gFName.value   = params.firstName;
			$gLName.value   = params.lastName;
			$gLAddress.value= params.address;
			$gCity.value    = params.city;
			$gState.value   = params.state;
			$gZip.value     = params.zipCode;
			//$gPhone.value   = params.phoneNum;
		}
		var $submit = document.getElementById('addRowSubmit');
		
		$submit.onclick = function(params) {	
			var param = {
				userId: $userId,
				email_address: $gAccount.innerHTML,
				firstName: $gFName.value,
				lastName: $gLName.value,
				address: $gLAddress.value,
				city: $gCity.value,
				state: $gState.value,
				zipCode: $gZip.value,
				//phoneNum: $gPhone.value,
				userCount: $count,
			}	
			var submitParams = DBClient.getParameters('user',param);
			DBClient.writeItem(submitParams);
			modal.style.display = "none"; 
			$(document.getElementById('modalTitle')).remove();
			handleUserLink();
		}
				
		// When the user clicks on <span> (x), close the modal	
		span.onclick = function() { 
			modal.style.display = "none"; 
			$(document.getElementById('modalTitle')).remove();
		}

		/*window.onclick = function(event) {
			if (event.target == modal) { 
				modal.style.display = "none";
				$(document.getElementById('modalTitle')).remove();
			}
		}*/
	}
	
	function setupTable(data) {
		$('#table').tabulator( {
			layout: "fitColumns",
			responsiveLayout: true,
			resizableRows: true,

			initialSort:[
				{column:"email_address", dir:"asc"},
			],
			columns: [
				{ title: "Email Address", field: 'email_address', widthGrow: 3},
				{ title: "First Name", field: 'firstName', sortable:true, sorter:"string", widthGrow:2},
				{ title: "Last Name" , field: 'lastName', sortable:true, sorter:"string", widthGrow:2},
				{ title: "Street Address", field: 'address', sortable:true, sorter:"string", widthGrow:3},
				{ title: "City", field: 'city', sortable:true, sorter:"string", widthGrow:2},
				{ title: "State", field: 'state', sortable:true, sorter:"string", widthGrow:2},
				{ title: "ZIP", field: 'zipCode', sortable:true, sorter:"number", widthGrow:2},
			],	
			cellClick: function(e, cell) {
				var rowData = cell.getRow().getData();
				setPopUp('Edit User',rowData);
			},
		});
	}
	
	EventEmitter.on('AdminGuardians:mount', function(message) {
		Cognito.isAuthenticated().then(function() {
			DBClient.connect();
			$container.innerHTML = tmpl('AdminGuardians', {})
			setupTNLeft();
			setupTNRight();
			DBClient.readItems('user').then(function(data) {
				setupTable(data);
				$('#table').tabulator("setData", data.Items);
				//setupAddControls();
				$root.appendChild($container);
			
			});
			$root.appendChild($container);
			if (message) {
				addAlert(message);
			}
		}).catch(function(error) {
			if (error) {
				console.log(error);
				handleLogOut();
			}
		})
	})
	
	EventEmitter.on('AdminGuardians:unmount', function() {
/* 		$temp = document.getElementById('topNav__LHome');
		$temp.removeEventListener('click', handleHomeLink); */
		$temp = document.getElementById('topNav__LChallenges');
		$temp.removeEventListener('click', handleChallengeLink);
		$temp = document.getElementById('topNav__LUsers');
		$temp.removeEventListener('click', handleUserLink);
		$temp = document.getElementById('topNav__LAdmins');
		$temp.removeEventListener('click', handleSettingsLink);
		$temp = document.getElementById('topNav__Logout');
		$temp.addEventListener('click', handleLogOut);
		
		while ($tnRight.firstChild) {
			$tnRight.removeChild($tnRight.firstChild);
		}
		while ($tnLeft.firstChild) {
			$tnLeft.removeChild($tnLeft.firstChild);
		}
		$container.remove();
	})
	
})(
  window.EventEmitter, 
  window.tmpl, 
  window.Cognito,
  window.DBClient,
)