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
		window.location.replace("./admin.php","Admin Login") 
	}
  
	function setupCatTable(data) {
		$('#catTable').tabulator( {
			initialSort:[
				{column:"chalCategory", dir:"asc"},
			],
			columns: [
				{ title: "Category Name", field: "chalCategory", sortable:true, sorter:"string"},
			],
			// cellClick: function(e, cell) {
			// var rowData = cell.getRow().getData();
			// },
		});
	}
	
		function setupAdminTable(data) {
		$('#catTable').tabulator( {
			initialSort:[
				{column:"chalCategory", dir:"asc"},
			],
			columns: [
				{ title: "Category Name", field: "chalCategory", sortable:true, sorter:"string"},
			],
			// cellClick: function(e, cell) {
			// var rowData = cell.getRow().getData();
			// },
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
		$body.innerHTML = tmpl('addChallengePage', {})
		$sel = document.getElementById('cCategory');
		
		DBClient.readItems('challengeCat').then(function(data) {
			var item = data.Items;
			for(var i=0;i<data.Count;i++) {
				$sel.insertAdjacentHTML('beforeend',"<option value='"+ item[i].chalCategory + "'>" + item[i].chalCategory + "</option>");
			}
			sortSelect($sel);
		})
		$footer.innerHTML = '<button id="addRowSubmit" type="button">Add Challenge</button>';
		
		
		var $challengeName = document.getElementById('cName');
		var $challengeDesc = document.getElementById('cDesc');
		var $challengeCat  = document.getElementById('cCategory');
		var $challengeAct  = document.getElementById('cActivate');
		var $challengeId  = $challengeCount+1;
		if(params != null) {
			console.log("NOT");
			$challengeName.value = params.challengeName;
			$challengeDesc.value = params.challengeDesc;
			$challengeCat.value = params.category;
			$challengeAct.checked = params.isActive;
			$challengeId = params.challengeId;
		}
		
		var $submit = document.getElementById('addRowSubmit');
		
		$submit.onclick = function(event) {	
			if(event != null) {event.preventDefault();}
			
			var params = {
				challengeId: 	$challengeId,
				challengeName:  $challengeName.value,
				challengeDesc:  $challengeDesc.value,
				category: 	    $challengeCat.value,
				isActive:		$challengeAct.checked,
			}
			var param = DBClient.getParameters('challenges',params);
			DBClient.writeItem(param);
			modal.style.display = "none"; 
			$(document.getElementById('modalTitle')).remove();
			handleChallengeLink();
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
