<!DOCTYPE html>

<!-- 
##################################################
Section - Sidebar 			 Last Update: 04/07/18
--------------------------------------------------	

Reference for Generation of the Side-Bar
##################################################
-->

<?php

/* Determines site the call is coming from to determine options*/
function currPageName() {
	return substr($_SERVER["SCRIPT_NAME"],strrpos($_SERVER["SCRIPT_NAME"],"/")+1);
}

//If the loading page is the login page...
if (strpos(currPageName(),"login") !== false) { ?>
	<!-- Currently do nothing - No Sidebar -->
<?php
} else {
?>
	<!-- Setup to Sidebar with the following options -->
	<div class="sidenav" id="sidebar" style="display:none"> <!-- Display Style sets the visibility by default - Required to avoid loading issues for sidebar -->
		<a href="/php/register.php"> Register </a>
		<a href="/php/admin.php"> Admin </a>
		<a href="/php/report.php"> Report </a>
	</div>
<?php
}
?>

