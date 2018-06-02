(function(EventEmitter, tmpl, Cognito){
	/* ChildPage */
	var $root = document.getElementById('root'), 
		$container = document.createElement('div'),
		$tnLeft = document.getElementById('topNavLeft'),
		$tnRight = document.getElementById('topNavRight'),
		$title,$alert,$button,$form,$link;

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
	function setupTNLeft(){}  

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
	
	function setPopUp(title, params=null) {
		var modal = document.getElementById('myModal');
		modal.style.display = "block";
		var span = document.getElementsByClassName("close")[0];
		var $header = document.getElementsByClassName("modal-header")[0];
		var $body = document.getElementsByClassName("modal-body")[0];
		var $footer = document.getElementsByClassName("modal-footer")[0];
		
		$header.insertAdjacentHTML('afterBegin',"<h3 id='modalTitle'> "+title+" </h3>")
		$body.innerHTML = tmpl('addChildPage', {})
		
		var $childName  = document.getElementById('cName');
		var $childGrade = document.getElementById('cGrade');
		var $childGender= document.getElementById('cGender');
		var childCount = 0, $completedMissions = [], $currentMissions = [], $points=[], $badges= [], $new = false, $cId = '';
		
		$footer.insertAdjacentHTML('beforeend','<input id="cAddChildRow" type="submit" form="addChild" value="Add Child"></button>')
		var $button = document.getElementById('cAddChildRow');
		
		if(params != null) {
			$button.value = "Update This Child";
			$childName.value 	= params.childName;
			$childGrade.value 	= params.childGrade;
			$childGender.value 	= params.childGender;
			childCount 			= params.Id;
			$completedMissions 	= params.completedMissions;
			$currentMissions 	= params.currentMissions;
			$cId				= params.childId,
			$points				= params.points,
			$badges 			= params.badges;
			
			$footer.insertAdjacentHTML('beforeend','  <button id="deleteChild" type="button" value="Delete Child">Delete This Child</button>')
			$("#deleteChild").on('click', function() {
				var del = window.confirm("Are you sure you want to delete this account?");
				if(del){
					var params = { "childId" : $cId	};
					params = DBClient.getDeleteParameters('child',params);
					DBClient.deleteItem(params);
					DBClient.readItems('child','parentId = :thisParent', {':thisParent': Cognito.getSub() });					
				}
				handleChildLink();				
				modal.style.display = "none"; 
				$footer.innerText = "";
				$(document.getElementById('modalTitle')).remove();
			});
		}
		var $submit = document.getElementById('cAddChildRow');
		$submit.onclick = function(exec) {	
			event.preventDefault();
			var sub = Cognito.getSub();
			DBClient.readItem(DBClient.getDeleteParameters('user',{'userId': Cognito.getSub()})).then(function(a) {
				if(childCount==0) {
					childCount = a.userCount+1; 
					$new = true;
				}
				
				var params = {
					childId:			(sub +":"+ childCount),
					Id:					childCount,
					childName:			$childName.value,
					childGrade: 		$childGrade.value,
					childGender:    	$childGender.value,
					completedMissions:	$completedMissions,
					currentMissions: 	$currentMissions,
					points:				$points,
					badges:				$badges,
					parentId:			sub,
				}
				
				var param = DBClient.getParameters('child',params);
				DBClient.writeItem(param);
				DBClient.updateItem({	
					TableName: 'user',
					Key: { 'userId': Cognito.getSub() },
							UpdateExpression: 'set #a = :x',
							ExpressionAttributeNames: {'#a': 'userCount'},
							ExpressionAttributeValues: { ':x' : a.userCount,},
				});
				if($new) {
					DBClient.updateItem({	
						TableName: 'user',
						Key: { 'userId': Cognito.getSub() },
						UpdateExpression: 'set #a = :x',
						ExpressionAttributeNames: {'#a': 'userCount'},
						ExpressionAttributeValues: { ':x' : childCount,},
					});		
				}
				handleChildLink();
				modal.style.display = "none"; 
				$footer.innerText = "";
				$(document.getElementById('modalTitle')).remove();
			});
		}
			
		// When the user clicks on <span> (x), close the modal	
		span.onclick = function() { 
			modal.style.display = "none"; 
			$footer.innerText = "";
			$(document.getElementById('modalTitle')).remove();
		}
	}
  
	EventEmitter.on('ChildPage:mount', function(message) {
		Cognito.isAuthenticated().then(function() {
			DBClient.connect();
			$container.innerHTML = tmpl('ChildPage', {})
			setupTNLeft();
			setupTNRight();
			
			DBClient.readItems('child','parentId = :thisParent', {':thisParent': Cognito.getSub() }).then(function(data) {
				var idCount= data.Count+1;

				$('#table').tabulator( {
					// layout:"fitDataFill",
					layout: "fitColumns",
					responsiveLayout: true,
					resizableColumns:true,
					
					initialSort:[
						{column:"childName", dir:"asc"},
					],
					columns: [
						// { title: "Child's Name", field: 'childName', width:"150", sortable:true,},
						{ title: "Child's Name", field: 'childName', widthGrow: 1, sortable:true,},
						{ title: "Grade", field: 'childGrade', widthGrow:1, widthShrink:1, sortable:true, sorter:"number", align: 'right',},
						{ title: "Gender", field: 'childGender', widthGrow: 1, sortable:true, sorter:"number"},
					],

					cellClick: function(e, cell) {
						var rowData = cell.getRow().getData();
						setPopUp(("Edit Child - "+ rowData.childName + ""),rowData);	
					},
				});

				$('#table').tabulator("setData", data.Items);
				$("button#addRow").on('click', function() {
					setPopUp("Add a Child");	
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
	while ($tnRight.firstChild) {
		$tnRight.removeChild($tnRight.firstChild);
	}
	$container.remove();
  })
})(
  window.EventEmitter, 
  window.tmpl, 
  window.Cognito
)
