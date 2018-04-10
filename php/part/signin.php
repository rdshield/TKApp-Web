<!DOCTYPE html>

<!-- 
##################################################
Section - Login Window		 Last Update: 04/07/18
--------------------------------------------------	
	
##################################################
-->

<div id="signupWindow">

	<div id="logo">
		<img src="./images/tklogo.png" style=" vertical-align: middle;" height=100px>
		<h2> Application Login </h2>
	</div>
	<form>
		<!--User Information Input for Login functionality-->
		<div class="input">
			<!-- Input Fields - Need to figure out how to secure them -->
			<div id="inputFields">
				<label for="uname"><b>User Name:</b></label> <input class='userIn' id='userID' type="text" placeholder="  Username" name="uname" required>
				<p></p>
				<label for="psw"><b>Password:  </b></label>	<input class='userIn' id='userPW' type="password" placeholder="  Password" name="psw" required>					
			</div>
		</div>
	</form>
	<div id="submit" class="button">
		<img id="submitArrow" src="./images/arrow.png" >
	</div>
	
	<!--Links to other Unauthenticated Pages -->
	<div class='links'>
		<a href="./php/register.php">	<span>Register a New Account</span> 	</a>
		<p>  </p>
		<a href="./php/reset.php">	<span>Forgot Your Password?</span> 	</a>
		<p>  </p>
	</div>
</div>