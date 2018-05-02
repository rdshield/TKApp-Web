<!DOCTYPE html>

<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<Title> TK Admin </Title>
		<link rel="stylesheet" type="text/css" href="/css/admin.css">
	</head>
	
	<body>
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
		<?php include("./php/part/templates-full.php"); ?>
		<script type="text/javascript" src="/js/config/adminconfig.js"></script>
		<script type="text/javascript" src="/js/lib/aws-cognito-sdk.min.js"></script>
		<script type="text/javascript" src="/js/lib/amazon-cognito-identity.min.js"></script>
		<script src="https://sdk.amazonaws.com/js/aws-sdk-2.1.12.min.js"></script>
		<script type="text/javascript" src="/js/lib/utils.js"></script>
		<script type="text/javascript" src="/js/lib/EventEmmiter.js"></script>
		<script type="text/javascript" src="/js/lib/Cognito.js"></script>
		<script type="text/javascript" src="/js/pages/AdminLogin.js"></script>
		<script type="text/javascript" src="/js/pages/AdminHome.js"></script>
		<script type="text/javascript" src="/js/pages/AdminChallenges.js"></script>
		<script type="text/javascript" src="/js/pages/AdminGuardians.js"></script>
		<script type="text/javascript" src="/js/pages/AdminSettings.js"></script>
		<script type="text/javascript" src="/js/adminHome.js"></script>
	</body>
</html> 