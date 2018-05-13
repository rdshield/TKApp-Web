(function(EventEmitter, tmpl, Cognito){
	/* Admin Settings Page */
	var $root = document.getElementById('root'), 
		$container = document.createElement('div'),
		$tnLeft = document.getElementById('topNavLeft'),
		$tnRight = document.getElementById('topNavRight'),
		$title, $button, $form,	$link;
	
	function setupTNLeft(){
		$tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LHome' , msg:'Home'  }));
		$temp = document.getElementById('topNav__LHome');
		$temp.addEventListener('click', handleHomeLink);
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
		EventEmitter.emit('AdminSettings:unmount');
		EventEmitter.emit('AdminChallenges:mount');
	}
  
  	function handleHomeLink() {
		EventEmitter.emit('AdminSettings:unmount');
		EventEmitter.emit('AdminHome:mount');
	}
	
	function handleUserLink() {
		EventEmitter.emit('AdminSettings:unmount');
		EventEmitter.emit('AdminGuardians:mount');
	}
  
	function handleSettingsLink() {
		EventEmitter.emit('AdminSettings:unmount');
		EventEmitter.emit('AdminSettings:mount');
	}
  
	function handleLogOut() {
		EventEmitter.emit('AdminSettings:unmount');
		Cognito.signOut();
		window.location.replace("./admin-login.html","Admin Login") 
	}
  
	function setupCatTable(data) {
		$('#catTable').tabulator( {
			initialSort:[
				{column:"chalCategory", dir:"asc"},
			],
			columns: [
				{ title: "Category Name", field: "chalCategory", sortable:true, sorter:"string"},
			],
				cellClick: function(e, cell) {
					var rowData = cell.getRow().getData();
					setPopUp("Edit Category", rowData);
				},
		});
	}
	
	function setPopUp(title, params=null) {
		var modal = document.getElementById('myModal');
		modal.style.display = "block";
		var span = document.getElementsByClassName("close")[0];
		var $header = document.getElementsByClassName("modal-header")[0];
		var $body = document.getElementsByClassName("modal-body")[0];
		var $footer = document.getElementsByClassName("modal-footer")[0];
		
		$header.insertAdjacentHTML('beforeend',"<h3 id='modalTitle'> "+title+" </h3>")
		$body.innerHTML = tmpl('categoryAdd', {})
		
		var $catName = document.getElementById('catName');
		
		$footer.innerHTML = '<button id="addRowSubmit" type="button">Add Category</button>';
		if(params != null) {
			console.log(params);
			$catName.value = params.chalCategory;
		}		
		
		var $submit = document.getElementById('addRowSubmit');		
		$submit.onclick = function(event) {	
			var param = {
				chalCategory : $catName.value,
			}	
			var submitParams = DBClient.getParameters('challengeCat',param);
			DBClient.writeItem(submitParams);
			modal.style.display = "none"; 
			$(document.getElementById('modalTitle')).remove();
			handleSettingsLink();
		}
				
		// When the user clicks on <span> (x), close the modal	
		span.onclick = function() { 
			modal.style.display = "none"; 
			$(document.getElementById('modalTitle')).remove();
		};
	}
  
	EventEmitter.on('AdminSettings:mount', function(message) {
		Cognito.isAuthenticated().then(function() {	
			DBClient.connect();
			$container.innerHTML = tmpl('AdminSettingsPage', {})
			setupTNLeft();
			setupTNRight();
			DBClient.readItems('challengeCat').then(function(data) {
				setupCatTable(data);
				$('#catTable').tabulator("setData", data.Items);
				$root.appendChild($container);
			})
			
			$('#addCat').on('click', function(){
				setPopUp("Add a Category");
			})
		}).catch(function(error) {
			console.log(error);
			handleLogOut();
		})
		$root.appendChild($container);
				
		
		
		
	})

	EventEmitter.on('AdminSettings:unmount', function() {
		$temp = document.getElementById('topNav__LHome');
		$temp.removeEventListener('click', handleHomeLink);
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
})(window.EventEmitter, window.tmpl, window.Cognito)
