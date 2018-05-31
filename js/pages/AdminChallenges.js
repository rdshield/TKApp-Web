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
			DBClient.readItems('missions').then(function(data) {
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
		// $temp = document.getElementById('topNav__LHome');
		// $temp.removeEventListener('click', handleHomeLink);
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
		cats = [], catFormat= {};
		DBClient.readItems('categories').then(function(data) {
			var item = data.Items;
			for(var i=0;i<data.Count;i++) {	cats.push({key: data.Items[i].categoryId, value: data.Items[i].categoryName});	}
			cats.map(obj =>{ catFormat[obj.key] = obj.value;	})
			$("#table").tabulator("redraw", true);
		})
		$('#table').tabulator( {
			// layout:"fitDataFill",
			layout:"fitColumns",

			responsiveLayout: true,
			resizableRows: true,
			initialSort:[
				{column:"missionId", dir:"asc"},
			],
			columns: [
				{ title: "ID#", field: "missionId", sortable:true, sorter:"number" ,width:75, widthGrow: 1},
				{ title: "Mission", field: "missionName", sortable:true, sorter:"string", widthGrow: 3},
				{ title: "Description", field: 'missionDesc', formatter:"textarea", sortable:true, sorter:"string",widthGrow: 5},
				{ title: "Point Value", field: 'value', sortable:true, sorter:"number", width: 120, widthGrow: 1},
				{ title: "Category", field: 'categoryId', sortable:true, sorter:"string", formatter:"lookup", formatterParams:catFormat, width: 300, widthGrow: 3},
				{ title: "Active", field: "isActive", formatter:"tickCross", width: 75},
			],
			cellClick: function(e, cell) {
				var rowData = cell.getRow().getData();
				setPopUp("Edit Mission",rowData);
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
			setPopUp("Create a mission");
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
		
		DBClient.readItems('categories').then(function(data) {
			var item = data.Items;
			for(var i=0;i<data.Count;i++) {
				$sel.insertAdjacentHTML('beforeend',"<option value='"+ item[i].categoryId + "'>" + item[i].categoryName + "</option>");
			}
			sortSelect($sel);
		})
		$footer.innerHTML = '<button id="addRowSubmit" type="submit" form="addChalForm">Add Challenge</button>';
		
		
		var $challengeName = document.getElementById('cName');
		var $challengeDesc = document.getElementById('cDesc');
		var $challengeCat  = document.getElementById('cCategory');
		var $challengeAct  = document.getElementById('cActivate');
		var $challengeVal  = document.getElementById('cValue');
		var $missionId     = -1;
		if(params != null) {
			$challengeName.value = params.missionName;
			$challengeDesc.value = params.missionDesc;
			$challengeCat.value = params.categoryId;
			$challengeAct.checked = params.isActive;
			$challengeId = params.missionId;
			$challengeVal.value = params.value;
			document.getElementById('addRowSubmit').innerHTML = "Update Challenge";
			$missionId = params.missionId;
		}
		
		$('#addChalForm').on('submit', function(event) {	
			if(event != null) {event.preventDefault();}
			DBClient.readItems('missions').then(function(data) {
				if($missionId < 0) { $missionId = data.Count };
				var params = {
					missionId: 	  $missionId,
					missionName:  $challengeName.value,
					missionDesc:  $challengeDesc.value,
					categoryId:   $challengeCat.value,
					isActive:	  $challengeAct.checked,
					value:		  $challengeVal.value,
				}
				var param = DBClient.getParameters('missions',params);
				DBClient.writeItem(param);
				modal.style.display = "none"; 
				$(document.getElementById('modalTitle')).remove();
				handleChallengeLink();
			});
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
