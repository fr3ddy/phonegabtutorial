var host = "http://192.168.178.24/";
var db = window.openDatabase("userdb", "1.0", "User Datenbank", 1000000);

$(document).ready(function() {
	$('#login').on("touch click", function() {
		login($('#password').val());
	});
});

function loadBlinks() {
	$.ajax({
		url : host + "blinkAPI/blinks",
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

function loadInventory() {
	function queryDB(tx) {
		tx.executeSql('SELECT * FROM USER', [], querySuccess, errorCB);
	}

	function querySuccess(tx, results) {
		var steamid = parseInt(results.rows.item(0).id);
		console.log(steamid);
		$.ajax({
			url : host + "blinkAPI/inventory/" + steamid,
			// the name of the callback parameter, as specified by the YQL service
			jsonp : "callback",
			// tell jQuery we're expecting JSONP
			dataType : "jsonp",
			// tell YQL what we want and that we want JSON
			success : function(response) {
				$('#content').html();
				$.each(response, function(key, val) {
					$('#content').append('<h2>'+val.name+'</h2>');
					$('#content').append('<img src="'+val.img+'" class="img-thumbnail" style="width: 100%;" />');
					$('#content').append('<div class="row"><div class="col-xs-offset-2 col-xs-4"><b>Amount:</b> '+val.amount+'</div><div class="col-xs-4"><b>Price:</b> '+val.price+' $</div></div>');
				});
			}
		});

	}

	function errorCB(err) {
		alert("Error processing SQL: " + err.code);
	}


	db.transaction(queryDB, errorCB);
}

function loadMyBlinks() {

}

function login(pw) {
	$.ajax({
		url : host + "blinkAPI/user/" + pw,
		// the name of the callback parameter, as specified by the YQL service
		jsonp : "callback",
		// tell jQuery we're expecting JSONP
		dataType : "jsonp",
		// tell YQL what we want and that we want JSON
		success : function(response) {
			console.log(response);
			function saveUser(tx) {
				tx.executeSql('DROP TABLE IF EXISTS USER');
				tx.executeSql('CREATE TABLE IF NOT EXISTS USER (id unique, playeravatar , playername)');
				tx.executeSql('INSERT INTO USER (id, playeravatar , playername) VALUES (' + response.steamid + ',"' + response.playeravatar + '" , "' + response.playername + '")');
			}


			db.transaction(saveUser, errorCB, successCB);
		}
	});
}

//DATABASE

// Transaction error callback
//
function errorCB(tx, err) {
	console.error("Error processing SQL: " + err);
}

// Transaction success callback
//
function successCB() {
	console.info("success!");
	window.location = 'blinks.html';
}