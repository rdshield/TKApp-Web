<!DOCTYPE html>

<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<Title> Team Kids - Login </Title>
		<link rel="stylesheet" type="text/css" href="/css/style.css">		
  	    <link rel="stylesheet" media="all" href="/css/Control.css">
		<link rel="stylesheet" media="all" href="/css/Alert.css">
		<link rel="stylesheet" media="all" href="/css/Button.css">
		<script src="/js/lib/jquery-3.3.1.min.js"></script>
		<script src="/js/lib/store.everything.min.js"></script>
	</head>
	<body>
		<script>
			init()
			function init() {
				console.log("Verifying if Store is supported by browser");
				if (!store.enabled) {	alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.'); return }
			}
			
		</script>	
		<?php include("./php/part/templates-login.php"); ?>		
		<div class="header">
			<!-- PHP Call for Top Navigation Bar -->
			<?php include("./php/part/topnav.php"); ?> 
		</div>
		
		<div class="info">
			<section id="content">
				<!-- Actual Container for data content -->
				<div id="root"> </div>
			</section>
		</div>
		
		<!-- Scripts -->
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
		<script type="text/javascript" src="/js/login.js"></script>
	</body>
</html> 