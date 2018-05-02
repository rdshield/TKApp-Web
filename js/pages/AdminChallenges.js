(function(EventEmitter, tmpl, Cognito, DBClient){
	/* AdminChallenges */
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
						{ title: "Delete", formatter:"tickCross", headerSort:false, align:'center'}
					],

					dataEdited:function(data){
						console.log(data[0]);
					    DBClient.writeItem(DBClient.getSingleWriteParams('challenges', data[0]));
						//handleChildLink();
					},
					
					cellClick: function(e, cell) {
						var rowData = cell.getRow().getData();
						var msg = ("(Challenge ID#" + rowData.challengeId + " - Name: " + rowData.challengeName + " - Age:" + ")");
						var del = window.confirm("Are you sure you want to delete the entry referenced below?\n"+ msg);
						if(del){
							var params = { "challengeId" : rowData.childId	};
							params = DBClient.getSingleDelParams('challenges',params);
							DBClient.deleteItem(params);
							var a = 1;					
						}
						handleChallengeLink();
					},
				});
				$('#table').tabulator("setData", data.Items);
			});
		}).catch(function(error) {
			console.log(error);
			//handleLogOut();
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
})(
  window.EventEmitter, 
  window.tmpl, 
  window.Cognito,
  window.DBClient,
)
