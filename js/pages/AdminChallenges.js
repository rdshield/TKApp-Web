(function(EventEmitter, tmpl, Cognito, DBClient){
	/* AdminChallenges */
	var $root = document.getElementById('root'), 
		$container = document.createElement('div'),
		$tnLeft = document.getElementById('topNavLeft'),
		$tnRight = document.getElementById('topNavRight'),
		$title,
		$alert,
		$button,
		$form,
		$link;

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
		window.location.replace("./admin-login.php","Admin Login") 
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
				{ title: "Challenge", field: "challengeName", sortable:true, editable:true, editor:'input'},
				{ title: "Description", field: 'challengeDesc', sortable:true, sorter:"string", editable:true, editor:'input'},
				{ title: "Category", field: 'category', sortable:true, sorter:"number", editable:true,
				  editor:'select', editorParams:{ 'Choice 1':"Choice 1", 'Choice 2':"Choice 2",	'Choice 3':" Choice 3",}},
				//{ title: "Delete", formatter:"tickCross", headerSort:false, align:'center'},
				{ title: "Active", field: "isActive", formatter:"tickCross", },
			],

			dataEdited:function(data){
				console.log(data[0]);
				DBClient.writeItem(DBClient.getParameters('challenges', data[0]));
				handleChildLink();
			},
					
			cellClick: function(e, cell) {
				var rowData = cell.getRow().getData();
				var msg = ("(Challenge ID#" + rowData.challengeId + " - Name: " + rowData.challengeName + " - Age:" + ")");
				var del = window.confirm("Are you sure you want to delete the entry referenced below?\n"+ msg);
				if(del){
					var params = { "challengeId" : rowData.childId	};
					params = DBClient.getDeleteParams('challenges',params);
					DBClient.deleteItem(params);
					var a = 1;					
				}
				handleChallengeLink();
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
			console.log(document.getElementsByClassName("addChallengePage").length);
			if(document.getElementsByClassName("addChallengePage").length == 0) {
				var $addButton = document.getElementById('addRow');
				$addButton.innerHTML = "Close";
				$addButton.insertAdjacentHTML('afterend', tmpl('addChallengePage',{}));
				$("button#addRowSubmit").on('click', function() {
					DBClient.readItems('challenges').then(function(a) {
					console.log(document.getElementById("cName"))
					console.log(document.getElementById("cDesc"))
					console.log(document.getElementById("cCategory"))
					console.log(document.getElementById("cActivate"))
					
					var b = a.Count;
					params = {
						"challengeId" 	: b,
						"challengeName" : (document.getElementById("cName").value),
						"challengeDesc" : (document.getElementById("cDesc").value),
						"category" 		: (document.getElementById("cCategory").value),
						"isActive"		: (document.getElementById("cActivate").value),
					}	
				
					var param = DBClient.getParameters('challenge',params);
					DBClient.writeItem(param);
					$(document.getElementsByClassName("addChallengePage"))[0].remove();
					});
					handleChallengeLink();
				})
			} else {
				var $addButton = document.getElementById('addRow');
				$addButton.innerHTML = "Add Challenge";
				var $addControls = document.getElementById('addBox');
				$addControls.remove();
			}
		});
	}
})(
  window.EventEmitter, 
  window.tmpl, 
  window.Cognito,
  window.DBClient,
)
