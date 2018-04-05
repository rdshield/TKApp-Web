<!DOCTYPE html>

<html>
	<head>
		<link rel="stylesheet" type="text/css" href="../css/style.css">
	</head>
	<body>
		<div class="header">
			<?php include("./php/topnav.php"); ?>
		</div>
		<div class="info">
			<?php include("./php/sidenav.php"); ?>
			<div id="content">
				<div id="container">
					<form id="login" action="/action_page.php">
						<label for="usrname">Username</label>
						<input type="text" id="usrname" name="usrname" required>

						<label for="psw">Password</label>
						<input type="password" id="psw" name="psw" required>	

						<input type="submit" value="Submit">
					</form>
				</div>
			</div>
		</div>
	</body>
</html> 