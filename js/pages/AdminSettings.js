(function(EventEmitter, tmpl, Cognito){
	/* Admin Settings Page */
	var $root = document.getElementById('root'), 
		$container = document.createElement('div'),
		$tnLeft = document.getElementById('topNavLeft'),
		$tnRight = document.getElementById('topNavRight'),
		$title, $button, $form,	$link, $s3;
	
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
				{column:"categoryName", dir:"asc"},
			],
			columns: [
				{ title: "Category Name", field: "categoryName", sortable:true, sorter:"string"},
				{ title: "Category Point Levels", field: "levels", sortable:true, sorter:"string"},
				
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
		$footer.innerHTML = '<button id="addRowSubmit" type="button">Add Category</button>';
		
		var $levelCount=1, levelArr = [];
		if(params != null) {				
			$length = params.levels.length;
			for(var i=0;i<$length;i++) {
				levelArr.push({'points': params.levels[i], 'badge': params.badges[i]});
				addLevel();
				$levelCount++;
			}
			var $catName = document.getElementById('catName');
			var $catValue = document.getElementById('catValue');
			var $catPic = document.getElementById('catPicDemo');
			$catName.value = params.categoryName;
			$catValue.value = levelArr[0].points;
			$catPic.src = levelArr[0].badge;
		}

		var $levelAdd = document.getElementById('newLevel');
		
		$levelAdd.onclick = function(event) {
			
			var $levelAdd = document.getElementById('newLevel');	
			var $levels = document.getElementById('levels');
			var $catInfo = document.getElementById('categoryInfo');
			$levels.insertAdjacentHTML('beforeend',tmpl('categoryLevel', { num: $levelCount }));
			if($levelCount==1) {	$catInfo.insertAdjacentHTML('beforeend',tmpl('catInfo', { num: $levelCount }));		}
			levelArr.push({'points': 0, 'badge': "images/badgePH.png" });
			var $lvlButton = document.getElementById('catLevel__' + $levelCount);
			var $catLabel = document.getElementById('catLabel');
			var $catValue = document.getElementById('catValue');
			var $catPic = document.getElementById('catPicDemo');
			//var $catFile = document.getElementById('catPic');	
			$lvlButton.onclick = function(event) {	
				//$catFile = document.getElementById('catPic');
				var prev = $catLabel.innerText.slice(-1);
				var next = parseInt(event.target.innerText);
				$catLabel.innerText = ("Level #"+ event.target.innerText);
				//$catFile.value = "";
				levelArr[prev-1].points = parseInt($catValue.value);
				//levelArr[prev-1].badge = $catPic.src;
				$catValue.value = levelArr[next-1].points;
				//$catPic.src = levelArr[next-1].badge;
			}
			$levelCount++;
		}
		
		function addLevel() {			
			var $levels = document.getElementById('levels');
			var $catInfo = document.getElementById('categoryInfo');
			$levels.insertAdjacentHTML('beforeend',tmpl('categoryLevel', { num: $levelCount }));
			if($levelCount==1) {
				$catInfo.insertAdjacentHTML('beforeend',tmpl('catInfo', { num: $levelCount }));
			}
			levelArr.push();
			var $lvlButton = document.getElementById('catLevel__' + $levelCount);
			var $catLabel = document.getElementById('catLabel');
			var $catValue = document.getElementById('catValue');
			//var $catPic = document.getElementById('catPicDemo');
	
			$lvlButton.onclick = function(event) {	
				//$catFile = document.getElementById('catPic');
				var prev = $catLabel.innerText.slice(-1);
				var next = parseInt(event.target.innerText);
				$catLabel.innerText = ("Level #"+ event.target.innerText);
				//$catFile.value = "";
				levelArr[prev-1].points = parseInt($catValue.value);
				//levelArr[prev-1].badge = $catPic;
				$catValue.value = levelArr[next-1].points;
				//$catPic = levelArr[next-1].badge;
			}
		}
		
		var $submit = document.getElementById('addRowSubmit');		
		$submit.onclick = function(event) {
			var $catName = document.getElementById('catName');
			var $catLabel = document.getElementById('catLabel');
			//var $catPic = document.getElementById('catPicDemo');
			var $catValue = document.getElementById('catValue');
			var prev = $catLabel.innerText.slice(-1);
			//levelArr[prev-1].badge = $catPic.src;
			levelArr[prev-1].points = parseInt($catValue.value);
				
			var points = [], badges = [];
			for(var i=0;i<levelArr.length;i++) {
				points.push(levelArr[i].points)
				badges.push(levelArr[i].badge)
			}
			
			function compare(a,b){
				comparison = 0;
				if (a > b){
					comparison = 1;
				} else if (b > a) {
					comparison = -1;
				}
				return comparison;
			};
			var points = points.sort(compare);
			
			DBClient.readItems('categories').then(function(data) {
				var catId = 0;
				if(params != null) { catId = params.categoryId; }
				else {	catId = data.Count; }
				var param = {	
					categoryId 	 : catId,
					categoryName : $catName.value,
					badges		 : badges,
					levels		 : points,
				}	
				var submitParams = DBClient.getParameters('categories',param);
				DBClient.writeItem(submitParams);
				modal.style.display = "none"; 
				$(document.getElementById('modalTitle')).remove();
				handleSettingsLink();
			});
		}
		
		// When the user clicks on <span> (x), close the modal	
		span.onclick = function() { 
			modal.style.display = "none"; 
			$(document.getElementById('modalTitle')).remove();
		};

	var $delLevel = document.getElementById('delLevel');		
		$delLevel.onclick = function(event) {
			var $catLabel = document.getElementById('catLabel');
			index = $catLabel.innerText.slice(-1);
			params.badges.splice(index-1, 1);
			params.levels.splice(index-1, 1);
			modal.style.display = "none"; 
			$(document.getElementById('modalTitle')).remove();
			setPopUp("Edit Category", params);
		}
	}
	
  
	EventEmitter.on('AdminSettings:mount', function(message) {
		Cognito.isAuthenticated().then(function() {	
			DBClient.connect();
			$container.innerHTML = tmpl('AdminSettingsPage', {})
			setupTNLeft();
			setupTNRight();
			DBClient.readItems('categories').then(function(data) {
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
