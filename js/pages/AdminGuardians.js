(function(EventEmitter, tmpl, Cognito, DBClient,){
	/* Admin Guardians Page */
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
		window.location.replace("./admin-login.php","Admin Login") 
	
  
	EventEmitter.on('AdminGuardians:mount', function(message) {
Cognito.isAuthenticated().then(function() {
			DBClient.connect();
			$container.innerHTML = tmpl('ChildPage', {})
			setupTNLeft();
			setupTNRight();
			DBClient.readItems('user').then(function(data) {
				$('#table').tabulator( {
					initialSort:[
						{column:"email_address", dir:"asc"},
					],
					columns: [
						{ title: "Email Address", field: 'email_address', sortable:true, editable:true, editor:'input'},
						{ title: "Child Count", field: 'userCount', sortable:true, sorter:"number"},
					//	{ title: "Gender", field: 'childGender', sortable:true, sorter:"number", editable:true,
					//	  editor:'select', editorParams:{ 'Male':"Male", 'Female':"Female",	'Other':"Other",}},
					//	{ title: "Delete", formatter:"tickCross", headerSort:false, align:'center'}
					],

					dataEdited:function(data){
						console.log(data[0]);
					    DBClient.writeItem(DBClient.getParameters('user', data[0]));
						//handleChildLink();
					},
					
					cellClick: function(e, cell) {
						var rowData = cell.getRow().getData();
						var msg = ("(Account: " + rowData.email_address + " - Name: ");
						var del = window.confirm("Are you sure you want to delete the entry referenced below? Please note that all progress will be lost.\n"+ msg);
						if(del){
							var params = { "userdId" : rowData.userId	};
							params = DBClient.getDeleteParams('user',params);
							DBClient.deleteItem(params);
							//var a = 1;
							//DBClient.readItems('child','parentId = :thisParent', {':thisParent': Cognito.getSub() });					
						}
						handleChildLink();
					},
				});

				$('#table').tabulator("setData", data.Items);
				$("button#addRow").on('click', function() {
					if(document.getElementsByClassName("addChildPage").length == 0) {
						var $addButton = document.getElementById('addRow');
						$addButton.innerHTML = "Close";
						$addButton.insertAdjacentHTML('afterend', tmpl('addChildPage',{}));
						
						$("button#addChildRow").on('click', function() {
							DBClient.readItem(DBClient.getParameters('user','userId', Cognito.getSub())).then(function(a) {
								a.userCount++;
								$addControls = document.getElementsByClassName('addControls')[0];
								var parentId = Cognito.getSub();
								var childId = (parentId +":"+a.userCount)
								params = {
									"childId" : childId,
									"Id" : a.userCount,
									"childName"   : (document.getElementById("cName").value),
									"childAge" 	  : (document.getElementById("cAge").value),
									"childGender" : (document.getElementById("cGender").value),
									"complChallenges" : [],
									"currChallenges" : [],
									"parentId" : parentId,
								}
								var param = DBClient.getParameters('child',params);
								DBClient.writeItem(param);
								DBClient.updateItem({	TableName: 'user',
														Key: { 'userId': Cognito.getSub() },
														UpdateExpression: 'set #a = :x',
														ExpressionAttributeNames: {'#a': 'userCount'},
														ExpressionAttributeValues: { ':x' : a.userCount,},
													});
								handleChildLink();
								$addControls.remove();
							});
							
							
						})
					}
					else {
						var $addButton = document.getElementById('addRow');
						$addButton.innerHTML = "Add a Child";
						var $addControls = document.getElementById('addBox');
						$addControls.remove();
					}
				});
				
				
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
