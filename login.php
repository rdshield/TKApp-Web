<!DOCTYPE html>

<html>
	<head>
		<link rel="stylesheet" type="text/css" href="./css/style.css">
	</head>
	<body>
		<div class="header">
			<?php include("./php/topnav.php"); ?>
		</div>
		<div class="info">
			<?php include("./php/sidenav.php"); ?>
			<section id="content" style="margin-left:200px">
				<div id="container">
					<div id="signupWindow">
						<div id="logo">
							<img src="http://ec2-18-144-21-247.us-west-1.compute.amazonaws.com/images/tklogo.png" style=" vertical-align: middle;" height=100px>
							<h2> Application Login </h2>
						</div>
						<div class="input">
							<div id="inputFields">
								<label for="uname"><b>Username:</b></label> <input id='userID' type="text" placeholder="Username" name="uname" required>
								<p></p>
								<label for="psw"><b>Password:  </b></label>	<input id='userPW' type="password" placeholder="Password" name="psw" required>					
							</div>
						</div>
						<div id="submit" class="button">
							<img id="submitArrow" src="http://ec2-18-144-21-247.us-west-1.compute.amazonaws.com/images/arrow.png" style=" vertical-align: middle;">
						</div>
					</div>
				</div>
			</section>
		</div>
		<script src="js/jquery-3.3.1.min.js"></script>
		<script src="js/sidebar.js"></script>
	</body>
</html> 

<body>
	<div class="container">
		
	</div>

	<script src="js/jquery-3.3.1.min.js"></script>
	<script src="js/signup.js"></script>
</body>

</html>