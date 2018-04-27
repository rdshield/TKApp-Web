<!DOCTYPE html>

<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<Title> Team Kids - Home </Title>
		<link rel="stylesheet" type="text/css" href="/css/style.css">
		<link rel="stylesheet" type="text/css" href="/css/datatables.css"/>
		<script src="/js/lib/jquery-3.3.1.min.js"></script>
		<script src="/js/lib/store.everything.min.js"></script>
	</head>
	<body>
	
		<?php include("./php/part/templates-home.php"); ?>		
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
		<script type="text/javascript" src="https://cdn.datatables.net/v/zf/dt-1.10.16/datatables.min.js"></script>
		<script type="text/javascript" src="/js/lib/utils.js"></script>
		<script type="text/javascript" src="/js/lib/EventEmmiter.js"></script>
		<script type="text/javascript" src="/js/lib/Cognito.js"></script>
		<script type="text/javascript" src="/js/lib/DBClient.js"></script>
		<script type="text/javascript" src="/js/pages/HomePage.js"></script>
		<script type="text/javascript" src="/js/pages/ChildPage.js"></script>
		<script type="text/javascript" src="/js/index.js"></script>
	</body>
</html> 