var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var UserSchema = new Schema({
	fb : Object, 
	accessToken : String, 
	data : Array
}, { 
	// minimize: false
});

var User = mongoose.model('User', UserSchema);