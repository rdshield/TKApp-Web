<!DOCTYPE html>

<!-- 
##################################################
Login Page					Last Update: 04/07/18
--------------------------------------------------	

Primary Login Screen for TKApp
	
##################################################
-->

<html>
	<head>
		<Title> Team Kids Login </Title>
		<link rel="stylesheet" type="text/css" href="./css/style.css">
	</head>
	
	<body>
		<!-- Space for the Top Bar - Currently set at 50 px by 100% width -->
		<div class="header">
			<?php include("./php/part/topnav.php"); ?> <!-- PHP Call for Top Navigation Bar -->
		</div>
		
		<!-- Space for the space below the Top Bar - Contains Side-bar and content container -->
		<div class="info">
			<!-- Section for Content - No Side bar for Login Screen-->			
			<section id="content">
				<!-- Actual Container for data content -->
				<div id="container">
					<?php include("./php/part/signin.php"); ?> <!-- PHP Call for Login Box -->
				</div>
			</section>
		</div>
		
		<!-- JQuery Calls - Keep at the bottom to minimize slow-down on page load -->
		<script src="js/jquery-3.3.1.min.js"></script>  <!-- Enables JQuery -->
		<script src="js/navigation.js"> </script> <!-- Navigation via AJAX -->
	</body>
</html> 