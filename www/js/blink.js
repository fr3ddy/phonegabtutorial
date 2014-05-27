$(document).ready(function() {

});

function loadPage(page) {
	$.ajax({
		url : "http://localhost/blinkAPI/" + page,
		// the name of the callback parameter, as specified by the YQL service
		jsonp : "callback",
		// tell jQuery we're expecting JSONP
		dataType : "jsonp",
		// tell YQL what we want and that we want JSON
		success : function(response) {
			$('#content').html();
			$.each(response, function(key, val) {
				$('#content').append(key+" - "+val);
			});
		}
	});
}
