<!-- Templates -->

<script type="text/html" id="HomePage">
	<div class="HomePage">
		<div class="title"></div>
		<div id="data">
		</div>		
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
	<div class="ChallengesPage">
		<div class="title"></div>
		<div id="data">
			<table id="table" >

			</table>
		</div>		
	</div>
</script>
 
<script type="text/html" id="Alert">
	<div class="Alert Alert__<%= type %>">
	  <span class="Alert__close"></span>
	  <%= message %>
	</div>
</script>
  
<script type="text/html" id="topNavButton">
	<button class="button2" id="topNav__<%= name %>" >	
		<span><%= msg %></span>
	</button>

	</div>
</script>