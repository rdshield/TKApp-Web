<?php
function curPageName() {
	return substr($_SERVER["SCRIPT_NAME"],strrpos($_SERVER["SCRIPT_NAME"],"/")+1);
}

if (strpos(curPageName(),"login") !== false) { ?>

<?php
} else {
?>
	<div class="sidenav" id="sidebar" style="display:none">
		<p> Development Links </p>
		<a href="/php/register.php"> Register </a>
		<a href="/php/login.php"> Login </a>
		<a href="/php/children.php"> Children </a>
		<a href="/php/admin.php"> Admin </a>
		<a href="/php/report.php"> Report </a>
	</div>echo "NO!";
<?php
}
?>

