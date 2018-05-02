(function(EventEmitter, tmpl, Cognito){
	/* ChildPage */
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

	function startLoading() {
		removeAlert()
		$button = $container.querySelectorAll('input[type=submit]')[0];
		$button.disabled = true;
		$button.value = 'Loading...';
	}

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
  
	function handleHomeLink() {
		EventEmitter.emit('ChildPage:unmount');
		EventEmitter.emit('HomePage:mount');
	}
  
	function handleChildLink() {
		EventEmitter.emit('ChildPage:unmount');
		EventEmitter.emit('ChildPage:mount');
	}
  
	function handleLogOut() {
		EventEmitter.emit('HomePage:unmount');
		Cognito.signOut();
		window.location.replace("./index.html","Login") 
	}
  
	EventEmitter.on('ChildPage:mount', function(message) {
		//console.log('Running Child Page');
		Cognito.isAuthenticated().then(function() {
			DBClient.connect();
			$container.innerHTML = tmpl('ChildPage', {})
			setupTNLeft();
			setupTNRight();
			DBClient.readItems('child','parentId = :thisParent', {':thisParent': Cognito.getSub() }).then(function(data) {
				//console.log(data);
				var idCount= data.Count+1;
				$('#table').tabulator( {
					initialSort:[
						{column:"childName", dir:"asc"},
					],
					columns: [
						//{ title: "ID#", field: "childId", sortable:true, sorter:"number"},
						{ title: "Child's Name", field: 'childName', sortable:true, editable:true, editor:'input'},
						{ title: "Age", field: 'childAge', sortable:true, sorter:"number", editable:true, editor:'number'},
						{ title: "Gender", field: 'childGender', sortable:true, sorter:"number", editable:true,
						  editor:'select', editorParams:{ 'Male':"Male", 'Female':"Female",	'Other':"Other",}},
						{ title: "Delete", formatter:"tickCross", headerSort:false, align:'center'}
					],

					dataEdited:function(data){
						console.log(data[0]);
					    DBClient.writeItem(DBClient.getSingleWriteParams('child', data[0]));
						//handleChildLink();
					},
					
					cellClick: function(e, cell) {
						var rowData = cell.getRow().getData();
						var msg = ("(Child ID#" + rowData.Id + " - Name: " + rowData.childName + " - Age:" + rowData.childAge + ")");
						var del = window.confirm("Are you sure you want to delete the entry referenced below? Please note that all progress will be lost.\n"+ msg);
						if(del){
							var params = { "childId" : rowData.childId	};
							params = DBClient.getSingleDelParams('child',params);
							DBClient.deleteItem(params);
							var a = 1;
							DBClient.readItems('child','parentId = :thisParent', {':thisParent': Cognito.getSub() })
							.then(function(data) {
								console.error(data.Items);
								/*
								var temp = data.Items;
								var e = 0;
								for(e;e<data.Items.length;e++)
								{
									temp.Id = e;
									var param = DBClient.getSingleWriteParams('child',temp);
									console.log(param);
									DBClient. writeItem(param);
								}
								*/								
							});							
						}
						handleChildLink();
					},
				});

				$('#table').tabulator("setData", data.Items);
				$("button#addRow").on('click', function() {
					if(document.getElementsByClassName("addChildPage").length == 0) {
						
						idCount = data.Items.length+1
						var $addButton = document.getElementById('addRow');
						$addButton.innerHTML = "Close";
						$addButton.insertAdjacentHTML('afterend', tmpl('addChildPage',{}));
						
						$("button#addChildRow").on('click', function() {
							$addControls = document.getElementsByClassName('addControls')[0];
							var parentId = Cognito.getSub();
							var childId = (parentId +":"+idCount)
							params = {
								"childId" : childId,
								"Id" : idCount,
								"childName"   : (document.getElementById("cName").value),
								"childAge" 	  : (document.getElementById("cAge").value),
								"childGender" : (document.getElementById("cGender").value),
								"complChallenges" : [],
								"currChallenges" : [],
								"parentId" : parentId,
							}
							var param = DBClient.getSingleWriteParams('child',params);
							//console.log(param);
							DBClient. writeItem(param);
							handleChildLink();
							$addControls.remove();
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
