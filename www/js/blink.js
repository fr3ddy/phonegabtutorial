var host = "http://192.168.178.24/";

$(document).ready(function() {
	$('#login').on("touch click", function() {
		login();
	});
});

function loadPage(page) {
	$.ajax({
		url : host + "blinkAPI/" + page,
		// the name of the callback parameter, as specified by the YQL service
		jsonp : "callback",
		// tell jQuery we're expecting JSONP
		dataType : "jsonp",
		// tell YQL what we want and that we want JSON
		success : function(response) {
			$('#content').html();
			$.each(response, function(key, val) {
				$('#content').append(key + " - " + val);
			});
		}
	});
}

function login() {
	var ref = window.open('https://steamcommunity.com/openid/login?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.mode=checkid_setup&openid.return_to=http%3A%2F%2Fcsgo-blink.com%2Fuser%2Flogin%3Flogin&openid.realm=http%3A%2F%2Fcsgo-blink.com&openid.ns.sreg=http%3A%2F%2Fopenid.net%2Fextensions%2Fsreg%2F1.1&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select', '_blank', 'location=yes');
}
