<!DOCTYPE html>

<!-- 
##################################################
Top Navigation Bar			 Last Update: 04/07/18
--------------------------------------------------	



##################################################
-->

<!-- Top Nav is split into three sections to allow compartmentalization -->
<div class="topNav">
	<!-- Left Section -->
	<div class="nav-element left">
		<nav>
			<!-- Button for Toggling Sidebar-View -->
			<div id="sbToggle" class="button" > <!-- Display currently hidden, as not being used -->
				<div style="margin:13px 10px;">
					<div class="bar"></div>
					<div class="bar"></div>
					<div class="bar"></div>
				</div>
			</div>
		</nav>
	</div>
	
	<!-- Center Section -->
	<div class="nav-element center"> 
	
	</div>
	
	<!-- Right Section -->
	<div class="nav-element right">
	<nav>
		<!-- Login Button - Will change to User Name and Logout/Settings Links -->
		<div class="rightbutton">				
			<a href="login.php">	
				<span>Login</span>
				<img src="http://ec2-18-144-21-247.us-west-1.compute.amazonaws.com/images/circle.png" style=" vertical-align: middle;" height=35px width=35px>		
			</a>
		</div>
		
		<!-- Temporary Button to get back to index page - Development - REMOVE AT Production -->
		<div class="rightbutton" style="background-color:green">
			<a href="index.php">	
				<span>Home</span>
			</a>
		</div>
	</nav>
	</div>
</div>
