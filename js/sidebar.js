$('#sbToggle').on('click', function() {
	if($('#sidebar').css('display') == "none"){
		$('#sidebar').fadeOut('slow');
		$('#sidebar').css('display', 'block');
		$('#sidebar').css('width', '200px');
		$('#content').css('marginLeft', '200px');
	}
	else {
		$('#sidebar').fadeIn('slow');
		$('#sidebar').css('display', 'none');
		$('#sidebar').css('width', '0%');
		$('#content').css('marginLeft', '0%');
	}
})