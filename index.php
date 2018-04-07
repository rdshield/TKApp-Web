<!DOCTYPE html>

<!-- 
##################################################
Primary Page				 Last Update: 04/07/18
--------------------------------------------------	

Primary Screen for TKApp 

Site to use once authentication has been established. 
Uses JQuery/AJAX and container section for single-page navigation

Note: For each page (login,registration,childs,etc, the whole site format needs to be coded. 
When pulling in the page via AJAX, the "container" portion will be stripped to avoid duplication.
	
##################################################
-->

<html>
	<head>
		<Title> Team Kids App </Title>
		<link rel="stylesheet" type="text/css" href="./css/style.css">
	</head>
	
	<body>
		<!-- Space for the Top Bar - Currently set at 50 px by 100% width -->
		<div class="header">
			<?php include("./php/topnav.php"); ?> <!-- PHP Call for Top Navigation Bar -->
		</div>
		
		<!-- Space for the space below the Top Bar - Contains Side-bar and content container -->	
		<div class="info">
			<!-- Section for Content (Margin is set to line up content with the sidebar showing by default)-->
			<?php include("./php/sidenav.php"); ?> <!-- PHP Call for Side-Bar -->
		
			<section id="content" style="margin-left:200px">
				<!-- Actual Container for data content -->
				<div id="container">
					MAIN PAGE
				</div>
			</section>
		</div>

		<!-- JQuery Calls - Keep at the bottom to minimize slow-down on page load -->
		<script src="js/jquery-3.3.1.min.js"></script>  <!-- Enables JQuery -->
		<script src="js/navigation.js"> </script> 		<!-- Navigation via AJAX -->
		<script src="js/sidebar.js"></script> 			<!-- Logic for Sidebar Toggle -->
	</body>
</html> 