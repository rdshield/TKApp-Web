(function(EventEmitter, tmpl, Cognito, DBClient){
	/* AdminChallenges */
	var $root = document.getElementById('root'), 
		$container = document.createElement('div'),
		$tnLeft = document.getElementById('topNavLeft'),
		$tnRight = document.getElementById('topNavRight'),
		$title,
		$button,
		$form,
		$link,
		$challengeCount = 0;

	function addAlert(options) {
		$title.insertAdjacentHTML('afterend', tmpl('Alert', options));
	}

	function removeAlert() {
		$alert = $container.getElementsByClassName('Alert')[0];
		$alert && $alert.remove();
	}

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
		EventEmitter.emit('AdminChallenges:unmount');
		EventEmitter.emit('AdminChallenges:mount');
	}
	
	function handleHomeLink() {
		EventEmitter.emit('AdminChallenges:unmount');
		EventEmitter.emit('AdminHome:mount');
	}
  
	function handleUserLink() {
		EventEmitter.emit('AdminChallenges:unmount');
		EventEmitter.emit('AdminGuardians:mount');
	}
  
	function handleSettingsLink() {
		EventEmitter.emit('AdminChallenges:unmount');
		EventEmitter.emit('AdminSettings:mount');
	}
  
	function handleLogOut() {
		EventEmitter.emit('AdminChallenges:unmount');
		Cognito.signOut();
		window.location.replace("./admin-login.html","Admin Login") 
	}
  
	EventEmitter.on('AdminChallenges:mount', function(message) {
		Cognito.isAuthenticated().then(function() { 
			DBClient.connect();
			$container.innerHTML = tmpl('AdminChallenges', {})
			setupTNLeft();
			setupTNRight();
			DBClient.readItems('challenges').then(function(data) {
				setupTable(data);
				$('#table').tabulator("setData", data.Items);
				setupAddControls();
				$root.appendChild($container);
				$challengeCount = data.Count;
			});
			$('#tableView').on('change',changeTableView);
		}).catch(function(error) {
			console.log(error);
			handleLogOut();
		})
		$root.appendChild($container);
	})

	EventEmitter.on('AdminChallenges:unmount', function() {
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
	

	function setupTable(data) {
		$('#table').tabulator( {
			initialSort:[
				{column:"challengeId", dir:"asc"},
			],
			columns: [
				{ title: "ID#", field: "challengeId", sortable:true, sorter:"number"},
				{ title: "Challenge", field: "challengeName", sortable:true, sorter:"string"},
				{ title: "Description", field: 'challengeDesc', formatter:"textarea", width:300, sortable:true, sorter:"string",},
				{ title: "Category", field: 'category', sortable:true, sorter:"string",},
				{ title: "Active", field: "isActive", formatter:"tickCross", },
			],
			cellClick: function(e, cell) {
				var rowData = cell.getRow().getData();
				setPopUp("Edit Challenge",rowData);
			},
			
		});
	}
	
	function changeTableView() {
		var val = $('#tableView')[0].value;
		if(val == "Disabled") {
			$("#table").tabulator("clearFilter");
			$("#table").tabulator("setFilter", "isActive", "=", false);
		}else if(val == "Active") {
			$("#table").tabulator("clearFilter");
			$("#table").tabulator("setFilter", "isActive", "=", true);
		}else{
			$("#table").tabulator("clearFilter");
		}
	}

	function setupAddControls() {
		$("button#addRow").on('click', function() {
			setPopUp("Create a Challenge");
		});
	}
	
	function sortSelect(selElem) {
		var tmpAry = new Array();
		for (var i=0;i<selElem.options.length;i++) {
			tmpAry[i] = new Array();
			tmpAry[i][0] = selElem.options[i].text;
			tmpAry[i][1] = selElem.options[i].value;
		}
		tmpAry.sort();
		while (selElem.options.length > 0) {
			selElem.options[0] = null;
		}
		for (var i=0;i<tmpAry.length;i++) {
			var op = new Option(tmpAry[i][0], tmpAry[i][1]);
			selElem.options[i] = op;
		}
		return;
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
		
		$('#addRowSubmit').on('submit', function(event) {	
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
		})
				
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
})(
  window.EventEmitter, 
  window.tmpl, 
  window.Cognito,
  window.DBClient,
)
