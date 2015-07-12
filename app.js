var mongoose = require('./config/mongoose')(); 
var app = require('./config/express')();

app.set('port', (process.env.PORT || 8081));
app.listen(app.get('port'), function() {
	console.log('App is running on port', app.get('port'));
});; 
