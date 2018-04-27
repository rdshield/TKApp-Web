<!-- Templates -->
<script type="text/html" id="LoginForm">
	<div class="LoginForm">			
		<div id="signupWindow">
			<div id="logo">
				<img src="./images/tklogo.png" style=" vertical-align: middle;" height=100px>
				<div class="title"><h2> Application Login </h2></div>
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
				<a class="Control__link" href="#signup"> Create a New Account </a>
			</form>
		</div>
	</div>
</script>

<script type="text/html" id="SignupForm">

	<div id="signupWindow">
		<div class="title"><h2>Sign Up</h2></div>
		<form class="form">
		<div class="Control">
			<label class="Control__label" for="email">Email</label>
			<input class="Control__input" name="email" type="text" placeholder="Email" />
		</div>
		<div class="Control">
			<label class="Control__label" for="password">Password</label>
			<input class="Control__input" name="password" type="password" placeholder="Password" />
		</div>
		<div class="Control">
			<label class="Control__label" for="repeatPassword">
				Repeat Password
			</label>
			<input class="Control__input" name="repeatPassword" type="password" placeholder="Repeat Password" />
		</div>
		<div class="Control">
			<label class="Control__label" for="name">Name (First and Last)</label>
			<input class="Control__input" name="name" type="text" placeholder="Please enter your full name" />
		</div>
		<input class="Control__input" type="submit" value="Sign me up!" />
	  </form>
	</div>
</script>
  
<script type="text/html" id="ConfirmForm">
	<div class="ConfirmForm">
	  <div class="title">Confirm email</div>
	  <form class="form">
		<div class="Control">
		  <label class="Control__label" for="code">Authorization code</label>
		  <input class="Control__input" name="code" type="text" placeholder="Authorization code" />
		</div>
		<input class="Control__input" type="submit" value="Here you go" />
		<a class="Control__link" href="#">
		  Please, resend the authorization code.
		</a>
		<hr />
	  </form>
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