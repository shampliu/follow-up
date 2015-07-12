var mongoose = require('./config/mongoose')(); 
var app = require('./config/express')();

var Gracenote = require("node-gracenote");
var clientId = "713984";
var clientTag = "6284A0B7013D83EC0C76E06CEDA2D2A2";
var userId = "280161755755239257-279103D3E8992B2660A9AD29E5CD5401";

var api = new Gracenote(clientId,clientTag,userId);

api.register(function(err, uid) {
	    // store this somewhere for the next session
	});

function search() {
	api.searchAlbum("Kings of Leon", "Only by the Night", function(err, result) {
		console.log("= SEARCH ALBUM RESULT");
		console.log(result[0]);
	    // Search Result as array
	});
	// var discography; 
	// api.searchArtist("ODESZA", function(result) {
	// 	console.log("= SEARCH ARTIST RESULT");
	// 	console.log(result);
	//     // Search Result as array
	// });


	api.searchTrack("Kings of Leon", "Only by the Night", "Sex on fire", function(err, result) {
		    // Search Result as array
		    console.log('TRACK FOUND');
		    console.log(result);
		});
		
	
}
search();



app.set('port', (process.env.PORT || 8081));
app.listen(app.get('port'), function() {
	console.log('App is running on port', app.get('port'));
});; 
