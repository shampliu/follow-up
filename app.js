var mongoose = require('./config/mongoose')(); 
var app = require('./config/express')();

var Gracenote = require("node-gracenote");
var clientId = "713984";
var clientTag = "6284A0B7013D83EC0C76E06CEDA2D2A2";
var userId = "280161755755239257-279103D3E8992B2660A9AD29E5CD5401";

var api = new Gracenote(clientId,clientTag,userId);
console.log(api);
api.searchArtist("Kings of Leon", function(result) {
	console.log(result);
    // Search Result as array
});


app.set('port', (process.env.PORT || 8081));
app.listen(app.get('port'), function() {
	console.log('App is running on port', app.get('port'));
});; 
