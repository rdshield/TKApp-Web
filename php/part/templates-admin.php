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

<script type="text/html" id="AdminSettingsPage">
	<div class="SettingsPage">
		<div class="title"></div>
		<div id="data"> </div>		
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
		<div id="data">
			<table id="table" >

			</table>
		</div>		
	</div>
</script>

<script type="text/html" id="AdminGuardians">
	<div class="GuardiansPage">
		<div class="title"></div>
		<div id="data">
			<table id="table"></table>
		</div>		
	</div>
</script>

<script type="text/html" id="AdminSettings">
	<div class="SettingsPage">
		<div class="title"></div>
		<div id="data">
			<table id="table" >

			</table>
		</div>		
	</div>
</script>

<script type="text/html" id="AdminChallenges">
	<div class="AdminChallengesPage">
		<div class="title"></div>
		<div id="data">
			<div tableDisplayControl>
				Show
				<select id="tableView" name="tableView" placeholder="All">
					<option selected value="All">All</option>
					<option value="Active">Active</option>
					<option value="Disabled">Disabled</option>
				</select>
				Challenges <br>
			</div>
			<button id="addRow" type="button">Add Challenge</button>
			<table id="table" ></table>
		</div>		
	</div>
</script>

<script type="text/html" id="addChallengePage">
	<label for="cName">Challenge Name: </label>
	<input id="cName" name="cName" type="text" placeholder="Challenge Name" />
	<label for="cDesc">Description: </label>
	<textarea id="cDesc" name="cDesc"></textarea>
	<label for="Challenge Type">Challenge Type: </label>
	<select id="cCategory" name="cCategory" type="select" placeholder="Category"></select>	
	<label for="cActivate"></label>
	<input id="cActivate" type="checkbox">Set Challenge as Active</input>
</script>

<script type="text/html" id="GuardianEdit">
	<label for="gName">User Name: </label>
	<text id="gName" name="gName" type="text"> </text>
	<label for="gFName">First Name: </label>
	<input id="gFName" name="gFName" type="text" placeholder=" " />
	<label for="gLName">Last Name: </label>
	<input id="gLName" name="gLName" type="text" placeholder=" " />
	<label for="gAddress">Address: </label>
	<input id="gAddress" name="gAddress" type="text" placeholder=" " />
	<label for="gCity">City: </label>
	<input id="gCity" name="gCity" type="text" placeholder=" " />
	<label for="gCity">State: </label>
	<input id="gState" name="gState" type="text" placeholder=" " />
	<label for="gZip">ZIP: </label>
	<input id="gZip" name="gZip" type="text" placeholder=" " />
	<label for="gPhone">Contact: </label>
	<input id="gPhone" name="gPhone" type="text" placeholder=" " />
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