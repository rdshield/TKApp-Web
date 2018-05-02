<script type="text/html" id="HomePage">
	<div class="HomePage">
		<div class="title"></div>
		<div id="data">
			<table id="table" style="width:95%">

			</table>
		</div>		
	</div>
</script>

<script type="text/html" id="ChildPage">
	<div class="ChildPage">
		<div class="title"></div>
		<div id="data">
			<div class="addControls">
				<button id="addRow" type="button"> Add a Child </button>
			</div>
			<table id="table">

			</table>
		</div>		
	</div>	
</script>

<script type="text/html" id="Alert">
	<div class="Alert Alert__<%= type %>">
	  <span class="Alert__close"></span>
	  <%= message %>
	</div>
</script>
  
<script type="text/html" id="topNavButton">
	<button class="button" id="topNav__<%= name %>" >	
		<span><%= msg %></span>
	</button>

	</div>
</script>

<script type="text/html" id="addChildPage">
	<div id="addBox" class="addChildPage">
		<button id="addChildRow" type="button">Add Child</button>
		<input id="cName" name="cName" type="text" placeholder="First Name" />
		<input id="cAge" name="cAge" type="text" placeholder="Age" />
		<select id="cGender" name="cGender" type="s" placeholder="Gender">
			<option selected disabled value="Gender">Gender</option>
			<option value="Male">Male</option>
			<option value="Female">Female</option>
			<option value="Not Specified">Not Specified</option>
		</select>		
	</div>	
</script>