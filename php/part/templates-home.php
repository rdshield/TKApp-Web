<!-- Templates -->
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
			<button id="addRow" type="button"> +Add a Child </button>
			<table id="table" style="width:66.6%">

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
	<button class="button2" id="topNav__<%= name %>" >	
		<span><%= msg %></span>
	</button>

	</div>
</script>

<script type="text/html" id="addChildPage">
	<div id="addPage" class="addChildPage" >
		<div class="title"></div>
		<div id="data">
			<div "addBox">
				<label for="cName"><input id="cName" name="cName" type="text" placeholder="Your Child's First Name" />
				<label for="cAge"><input id="cAge" name="cAge" type="text" placeholder="How old is your child?" />
				<label for="cGender"><select id="cGender" name="cGender" type="s" placeholder="">
					<option value="Not Specified">Not Specified</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
				<select>
				<button id="addChildRow" type="button">Add Child</button>
			</div>
		</div>		
	</div>	
</script>
