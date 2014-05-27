var host = "http://192.168.178.24/";
var Steam = require('steam');

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
	var bot = new Steam.SteamClient();
	bot.logOn({
		accountName : 'xxkingarthurxx',
		password : 'Apfel1994!'
	});
	bot.on('loggedOn', function() {
		alert("nice");
	});
}
