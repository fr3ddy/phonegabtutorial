var host = "http://192.168.178.24/";

$(document).ready(function() {

});

function loadPage(page) {
	$.ajax({
		url : host+"blinkAPI/" + page,
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
