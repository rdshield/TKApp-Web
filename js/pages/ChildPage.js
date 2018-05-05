(function(EventEmitter, tmpl, Cognito){
	/* ChildPage */
	var $root = document.getElementById('root'), 
		$container = document.createElement('div'),
		$tnLeft = document.getElementById('topNavLeft'),
		$tnRight = document.getElementById('topNavRight'),
		$title,
		$alert,
		$button,
		$form,
		$link;

	//Locking down the Submit button while work is being done in the background
	function startLoading() {
		removeAlert()
		$button = $container.querySelectorAll('input[type=submit]')[0];
		$button.disabled = true;
		$button.value = 'Loading...';
	}
	
	//Unlocking the Submit button when work is done
	function stopLoading() {
		$button.disabled = false;
		$button.value = 'Login';
	}

	//Functions for On-screen Alerts	
	function addAlert(options) {
		$title.insertAdjacentHTML('afterend', tmpl('Alert', options));
	}

	function removeAlert() {
		$alert = $container.getElementsByClassName('Alert')[0];
		$alert && $alert.remove();
	}

	//Setup for Left/Right Top Navigation bar
	function setupTNLeft(){
		// $tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LHome' , msg:'Home'  }));
		// $c = document.getElementById('topNav__LHome');
		// $c.addEventListener('click', handleHomeLink);
		// $tnLeft.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'LChild', msg:'My Children' }));
		// $b = document.getElementById('topNav__LChild');
		// $b.addEventListener('click', handleChildLink);  
	}  

	function setupTNRight(){
		$tnRight.insertAdjacentHTML('beforeend', tmpl('topNavButton', { name:'Logout', msg:'Logout' }));
		$b = document.getElementById('topNav__Logout');
		$b.addEventListener('click', handleLogOut);
	}  	
  
	//Redirect to Home Page
	function handleHomeLink() {
		EventEmitter.emit('ChildPage:unmount');
		EventEmitter.emit('HomePage:mount');
	}
  
	//Reloads Child Page to bring it back to default
	function handleChildLink() {
		EventEmitter.emit('ChildPage:unmount');
		EventEmitter.emit('ChildPage:mount');
	}
  
	//Close all open sessions and redirect to the main login page
	function handleLogOut() {
		EventEmitter.emit('ChildPage:unmount');
		Cognito.signOut();
		window.location.replace("./index.html","Login") 
	}
  
	EventEmitter.on('ChildPage:mount', function(message) {
		Cognito.isAuthenticated().then(function() {
			DBClient.connect();
			$container.innerHTML = tmpl('ChildPage', {})
			setupTNLeft();
			setupTNRight();
			
			DBClient.readItems('child','parentId = :thisParent', {':thisParent': Cognito.getSub() }).then(function(data) {
				//console.log(data);
				var idCount= data.Count+1;
				$('#table').tabulator( {
					layout:"fitDataFill",
					resizableColumns:false,
					initialSort:[
						{column:"childName", dir:"asc"},
					],
					columns: [
						//{ title: "ID#", field: "childId", sortable:true, sorter:"number"},
						{ title: "Child's Name", field: 'childName', width:"150", sortable:true, editable:true, editor:'input'},
						{ title: "Grade", field: 'childGrade', width:"100", widthShrink:1, sortable:true, sorter:"number", align: 'right', editable:true, editor:'number'},
						{ title: "Gender", field: 'childGender', width: "100", sortable:true, sorter:"number", editable:true,
						  editor:'select', editorParams:{ 'Male':"Male", 'Female':"Female",	'Other':"Other",}},
						{ title: "Delete", formatter:"tickCross", width: "10px", headerSort:false, align:'center',frozen:true},
					],

					dataEdited:function(data){
						console.log(data[0]);
					    DBClient.writeItem(DBClient.getParameters('child', data[0]));
						//handleChildLink();
					},
					
					cellClick: function(e, cell) {
						var rowData = cell.getRow().getData();
						var msg = ("(Child ID#" + rowData.Id + " - Name: " + rowData.childName + " - Grade:" + rowData.childGrade + ")");
						var del = window.confirm("Are you sure you want to delete the entry referenced below? Please note that all progress will be lost.\n"+ msg);
						if(del){
							var params = { "childId" : rowData.childId	};
							params = DBClient.getDeleteParams('child',params);
							DBClient.deleteItem(params);
							var a = 1;
							DBClient.readItems('child','parentId = :thisParent', {':thisParent': Cognito.getSub() });					
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
							DBClient.readItem(DBClient.getDeleteParameters('user',{'userId': Cognito.getSub()})).then(function(a) {
								a.userCount++;
								$addControls = document.getElementsByClassName('addControls')[0];
								var parentId = Cognito.getSub();
								var childId = (parentId +":"+a.userCount)
								params = {
									"childId" : childId,
									"Id" : a.userCount,
									"childName"   : (document.getElementById("cName").value),
									"childGrade" 	  : (document.getElementById("cGrade").value),
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

 
  EventEmitter.on('ChildPage:unmount', function() {
	$b = document.getElementById('topNav__LHome');
	$b && $b.removeEventListener('click', handleHomeLink);
	$c = document.getElementById('topNav__LChild');
	$c && $c.removeEventListener('click', handleChildLink);
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
  window.Cognito
)
