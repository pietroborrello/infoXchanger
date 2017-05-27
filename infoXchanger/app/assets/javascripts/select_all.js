$(document).ready(function(){
	$('#select_all').click(function() {
	   if (this.checked) {
		   $(':checkbox').each(function() {
			   $(this).prop('checked', true)                      
		   });
	   } else {
		  $(':checkbox').each(function() {
				$(this).prop('checked', false)                      
		   });
	   } 
	});
});
