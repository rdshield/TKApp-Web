<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<Title> Team Kids Login </Title>
		<link rel="stylesheet" type="text/css" href="./css/style.css">		
  	    <link rel="stylesheet" media="all" href="/css/Control.css">
		<link rel="stylesheet" media="all" href="/css/Alert.css">
		<link rel="stylesheet" media="all" href="/css/Button.css">
		<link rel="stylesheet" media="all" href="/css/Well.css">
	</head>
	
	<body>
		<?php include("./php/part/templates.php"); ?>
		<!-- Space for the space below the Top Bar - Contains Side-bar and content container -->
		<div class="info">
			<!-- Section for Content - No Side bar for Login Screen-->			
			<section id="content">
				<!-- Actual Container for data content -->
				<div id="root"> </div>
			</section>
		</div>
		
		<!-- Scripts -->
		<script src="/js/lib/aws-cognito-sdk.min.js"></script>
		<script src="/js/lib/amazon-cognito-identity.min.js"></script>
		<script src="js/lib/jquery-3.3.1.min.js"></script>  <!-- Enables JQuery -->
		<script src="/js/config.js"></script>
		<script src="/js/utils.js"></script>
		<script src="/js/EventEmmiter.js"></script>
		<script src="/js/Cognito.js"></script>
		<script src="/js/pages/LoginForm.js"></script>
		<script src="/js/pages/ConfirmForm.js"></script>
		<script src="/js/pages/SignupForm.js"></script>
		<script src="/js/Welcome.js"></script>
		<script src="/js/index.js"></script>
		<script src="js/navigation.js"> </script> <!-- Navigation via AJAX -->
	</body>
</html> 