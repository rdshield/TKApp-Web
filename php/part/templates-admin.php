<!-- Templates -->

<script type="text/html" id="HomePage">
	<div class="HomePage">
		<div class="title"></div>
		<div id="data"> </div>		
	</div>
</script>

<script type="text/html" id="ChildPage">
	<div class="ChildPage">
		<div class="title"></div>
		<div id="data">
			<table id="table" >

			</table>
		</div>		
	</div>
</script>

<script type="text/html" id="AdminLogin">
	<div class="AdminLoginForm">			
		<div id="signupWindow">
			<div id="logo">
				<img src="./images/tklogo.png" style=" vertical-align: middle;" height=100px>
				<div class="title"><h2> Application Login - Admin </h2></div>
			</div>
			<form class="form">
				<div class="Control">
					<label class="Control__label" for="email">Email</label>
					<input class="Control__input" id="uEM" name="email" type="text" placeholder="Email" />
				</div>
				<div class="Control">
					<label class="Control__label" for="password">Password</label>
					<input class="Control__input" id="uPW" name="password" type="password" placeholder="Password" />
				</div>
				<input class="Control__input" type="submit" value="Login" />
			</form>
		</div>
	</div>
</script>

<script type="text/html" id="AdminHome">
	<div class="AdminPage">
		<div class="title"></div>
		ADMIN PAGE	
	</div>
</script>

<script type="text/html" id="AdminGuardians">
	<div class="GuardiansPage">
		<div class="title"></div>
		ADMIN GUARDIANS PAGE	
	</div>
</script>

<script type="text/html" id="AdminSettings">
	<div class="SettingsPage">
		<div class="title"></div>
		ADMIN SETTING PAGE	
	</div>
</script>

<script type="text/html" id="AdminChallenges">
	<div class="AdminChallengesPage">
		<div class="title"></div>
		<div id="data">
			<select id="tableView" name="tableView" placeholder="All">
				<option selected value="All">All</option>
				<option value="Active">Active</option>
				<option value="Disabled">Disabled</option>
			</select>
			<button id="addRow" type="button">Add Challenge</button>
			<table id="table" ></table>
		</div>		
	</div>
</script>


<script type="text/html" id="addChallengePage">
	<div id="addBox" class="addChallengePage">
		<button id="addRowSubmit" type="button">Add Challenge</button>
		<input id="cName" name="cName" type="text" placeholder="Challenge Name" />
		<textarea id="cDesc" name="cDesc"></textarea>
		<select id="cCategory" name="cCategory" type="select" placeholder="Category">
			<option selected disabled value="">Choose a Category</option>
			<option value="Category 1">Category 1</option>
			<option value="Category 2">Category 2</option>
			<option value="Category 3">Category 3</option>
			<option value="Category 4">Category 4</option>
			<option value="Category 5">Category 5</option>
		</select>		
	</div>	
</script>
 
<script type="text/html" id="Alert">
	<div class="Alert Alert__<%= type %>">
	  <%= message %>
	</div>
</script>
  
<script type="text/html" id="topNavButton">
	<button class="button2" id="topNav__<%= name %>" >	
		<span><%= msg %></span>
	</button>

	</div>
</script>