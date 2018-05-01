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
			<button id="addRow" type="button"> + </button>
			<table id="table" style="width:95%">

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