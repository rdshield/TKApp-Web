<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<Title> Team Kids Login </Title>
		<link rel="stylesheet" type="text/css" href="./css/style.css">		
  	    <link rel="stylesheet" media="all" href="/css/login/Control.css">
		<link rel="stylesheet" media="all" href="/css/login/Alert.css">
		<link rel="stylesheet" media="all" href="/css/login/Button.css">
		<link rel="stylesheet" media="all" href="/css/login/Well.css">
	</head>
	
	<body>
		<?php include("./php/part/templates.php"); ?>
		<!-- Space for the Top Bar - Currently set at 50 px by 100% width -->
		<div class="header">
			<?php include("./php/part/topnav.php"); ?> <!-- PHP Call for Top Navigation Bar -->
		</div>
		
		<!-- Space for the space below the Top Bar - Contains Side-bar and content container -->
		<div class="info">
			<!-- Section for Content - No Side bar for Login Screen-->			
			<section id="content">
				<!-- Actual Container for data content -->
				<div id="root"> </div>
			</section>
		</div>
		
		<!-- Scripts -->
		<script src="/js/login/lib/aws-cognito-sdk.min.js"></script>
		<script src="/js/login/lib/amazon-cognito-identity.min.js"></script>
		<script src="/js/login/config.js"></script>
		<script src="/js/login/utils.js"></script>
		<script src="/js/login/EventEmmiter.js"></script>
		<script src="/js/login/Cognito.js"></script>
		<script src="/js/login/LoginForm.js"></script>
		<script src="/js/login/ConfirmForm.js"></script>
		<script src="/js/login/SignupForm.js"></script>
		<script src="/js/login/Welcome.js"></script>
		<script src="/js/login/index.js"></script>
			
		<!-- JQuery Calls - Keep at the bottom to minimize slow-down on page load -->
		<script src="js/jquery-3.3.1.min.js"></script>  <!-- Enables JQuery -->
		<script src="js/navigation.js"> </script> <!-- Navigation via AJAX -->
	</body>
</html> 