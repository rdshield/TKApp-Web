<!DOCTYPE html>

<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<Title> TK Admin </Title>
		<link rel="stylesheet" type="text/css" href="/css/admin.css">
		<link rel="stylesheet" text="text/css" href="/css/tabulator.css">
		<script type="text/javascript" src="/js/lib/jquery-3.3.1.min.js"></script>
		<script type="text/javascript" src="/js/lib/jquery-ui.js"></script>
		<script type="text/javascript" src="/js/lib/tabulator.min.js"></script>
		<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	</head>
	
	<body>
		<div class="header">
			<?php include("./php/part/topnav.php"); ?> 
		</div>
		<div id="myModal" class="modal">
			<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-header">
					<span class="close">&times;</span>
				</div>
				<div class="modal-body"> </div>
				<div class="modal-footer"> </div>
			</div>
		</div>
		
		<section id="content">
			<!-- Actual Container for data content -->
			<div id="root"> </div>
		</section>
		
		<!-- Scripts -->
		<?php include("./php/part/templates-admin.php"); ?>
		<script type="text/javascript" src="/js/config/adminconfig.js"></script>
		<script type="text/javascript" src="/js/lib/aws-cognito-sdk.min.js"></script>
		<script type="text/javascript" src="/js/lib/amazon-cognito-identity.min.js"></script>
		<script type="text/javascript" src="https://sdk.amazonaws.com/js/aws-sdk-2.224.1.min.js"></script>
		<script type="text/javascript" src="/js/lib/utils.js"></script>
		<script type="text/javascript" src="/js/lib/EventEmmiter.js"></script>
		<script type="text/javascript" src="/js/lib/Cognito.js"></script>
		<script type="text/javascript" src="/js/lib/DBClient.js"></script>
		<script type="text/javascript" src="/js/pages/AdminHome.js"></script>
		<script type="text/javascript" src="/js/pages/AdminChallenges.js"></script>
		<script type="text/javascript" src="/js/pages/AdminGuardians.js"></script>
		<script type="text/javascript" src="/js/pages/AdminSettings.js"></script>
		<script type="text/javascript" src="/js/adminHome.js"></script>
	</body>
</html> 