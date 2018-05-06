<!DOCTYPE html>

<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<Title> Team Kids - Login </Title>
		<link rel="stylesheet" type="text/css" href="/css/style.css">
		<script src="/js/lib/jquery-3.3.1.min.js"></script>
	</head>
	<body>
		<div class="header">
			<?php include("./php/part/topnav.php"); ?> 
		</div>

		<div class="info">
			<section id="content">
				<!-- Actual Container for data content -->
				<div id="root"> </div>
			</section>
		</div>
		
		<!-- Scripts -->
		<?php include("./php/part/templates-login.php"); ?>	
		<script type="text/javascript" src="/js/config/config.js"></script>
		<script type="text/javascript" src="/js/lib/aws-cognito-sdk.min.js"></script>
		<script type="text/javascript" src="/js/lib/amazon-cognito-identity.min.js"></script>
		<script type="text/javascript" src="https://sdk.amazonaws.com/js/aws-sdk-2.224.1.min.js"></script>
		<script type="text/javascript" src="/js/lib/utils.js"></script>
		<script type="text/javascript" src="/js/lib/EventEmmiter.js"></script>
		<script type="text/javascript" src="/js/lib/Cognito.js"></script>
		<script type="text/javascript" src="/js/pages/LoginForm.js"></script>
		<script type="text/javascript" src="/js/pages/ConfirmForm.js"></script>
		<script type="text/javascript" src="/js/pages/SignupForm.js"></script>
		<script type="text/javascript" src="/js/pages/pwResetForm.js"></script>
		<script type="text/javascript" src="/js/login.js"></script>
	</body>
</html> 