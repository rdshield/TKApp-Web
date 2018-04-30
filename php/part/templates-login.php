<!-- Templates -->
<script type="text/html" id="LoginForm">
	<div class="LoginForm">			
		<div id="signupWindow">
			<div id="logo">
				<img src="./images/tklogo.png" style=" vertical-align: middle;" height=100px>
				<div class="title">
					<h2> Application Login </h2>
				</div>
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
				<p></p>
				<a class="Control__link pwReset" href="#reset"> Forgot Your Password? </a>
				<p></p>
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
			<input class="Control__input" name="email" type="text" placeholder="Email" required />
		</div>
		<div class="Control">
			<label class="Control__label" for="fName">First Name</label>
			<input class="Control__input" name="fName" type="text" placeholder="First Name" required />
			<label class="Control__label" for="lName">Last Name</label>
			<input class="Control__input" name="lName" type="text" placeholder="Last Name" required />
		</div>
		<div class="Control">
			<label class="Control__label" for="address">Street Address</label>
			<input class="Control__input" name="address" type="text" placeholder="Address (Optional)" />
			<label class="Control__label" for="city">City</label>
			<input class="Control__input" name="city" type="text" placeholder="City"  />
			<label class="Control__label" for="state">State</label>
			<input class="Control__input" name="state" type="text" placeholder="State" />
			<label class="Control__label" for="zipCode">Zip Code</label>
			<input class="Control__input" name="zipCode" type="text" placeholder="Zip Code"  />
		</div>
		<div class="Control">
			<label class="Control__label" for="phoneNum">Contact Number</label>
			<input class="Control__input" name="phoneNum" type="text" placeholder="(xxx)xxx-xxxx" />
		</div>
		<div class="Control">
			<label class="Control__label" for="joinEmail">Join our newsletter</label>
			<input type="checkbox" name="joinEmail">
			<label class="Control__label" for="method">How did you hear about TeamKids?</label>
			<select id="methodOfNotice" class="Control__input" name="method">
				<option value="web">Online</option>
				<option value="print">Magazine</option>
				<option value="wordOfMouth">Word of Mouth</option>	
				<option value="other">Other</option>
			</select>
		</div>
		<div class="Control">
			<label class="Control__label" for="password">Password</label>
			<input class="Control__input" name="password" type="password" placeholder="Password" required />
		</div>
		<div class="Control">
			<label class="Control__label" for="repeatPassword">
				Repeat Password
			</label>
			<input class="Control__input" name="repeatPassword" type="password" placeholder="Repeat Password" required />
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

<script type="text/html" id="pwdResetForm">
	<div class="pwdResetForm">
	  <div class="title"></div>
	  <form class="form">
		<div class="Control">
			<label class="Control__label" for="email">Please provide your Email Address:</label>
			<input class="Control__input" id="email" name="email" type="text" placeholder="Email" required />
		</div>
		
		<input class="Control__input" type="submit" value="Submit" />
		<a class="Control__link" href="#">
	  </form>
	</div>
</script> 

<script type="text/html" id="pwdResetConfirm">

	<div class="pwdResetConfirm">
	  <div class="title"></div>
	  <form class="form">
		<div class="Control">
		  <label class="Control__label" for="code">Authorization code</label>
		  <input class="Control__input" name="code" type="text" placeholder="Authorization code" required />
		</div>
		<div class="Control">
			<label class="Control__label" for="password">New Password</label>
			<input class="Control__input" name="password" type="password" placeholder="Password" required />
		</div>
		<div class="Control">
			<label class="Control__label" for="repeatPassword">
				Repeat your New Password
			</label>
			<input class="Control__input" name="repeatPassword" type="password" placeholder="Repeat Password" required />
		</div>
		
		<input class="Control__input" type="submit" value="Submit" />
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
</script>