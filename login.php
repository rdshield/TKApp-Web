<!DOCTYPE html>

<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<Title> Team Kids - Login </Title>
		<link rel="stylesheet" type="text/css" href="/css/style.css">		
  	    <link rel="stylesheet" media="all" href="/css/Control.css">
		<link rel="stylesheet" media="all" href="/css/Alert.css">
		<link rel="stylesheet" media="all" href="/css/Button.css">
	</head>
	
	<body>
		<?php include("./php/part/templates.php"); ?>
		
		<div class="header">
			<!-- PHP Call for Top Navigation Bar -->
			<?php include("./php/part/topnav.php"); ?> 
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
		<script src="/js/config/config.js"></script>
		<script src="/js/lib/aws-cognito-sdk.min.js"></script>
		<script src="/js/lib/amazon-cognito-identity.min.js"></script>
		<script src="https://sdk.amazonaws.com/js/aws-sdk-2.224.1.min.js"></script>
		<script src="/js/lib/jquery-3.3.1.min.js"></script>  <!-- Enables JQuery -->
		<script src="/js/lib/utils.js"></script>
		<script src="/js/lib/EventEmmiter.js"></script>
		<script src="/js/lib/Cognito.js"></script>
		<script src="/js/lib/db.js"></script>
		<script src="/js/pages/LoginForm.js"></script>
		<script src="/js/pages/ConfirmForm.js"></script>
		<script src="/js/pages/SignupForm.js"></script>
		<script src="/js/pages/HomePage.js"></script>
		<script src="/js/pages/ChildPage.js"></script>
		<script src="/js/index.js"></script>
	</body>
</html> 