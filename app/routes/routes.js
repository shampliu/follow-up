// Invoke 'strict' JavaScript mode
'use strict';

var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,
	mongoose = require('../../config/mongoose')();

var User = mongoose.model('User');


// Define the routes module' method
module.exports = function(app) {

	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});

	var url; 
	if (process.env.NODE_ENV === 'development') {
		url = "http://localhost:8080/auth/facebook/callback";
	}
	else {
		url = "/auth/facebook/callback"
	}

	passport.use(new FacebookStrategy({
	    clientID: 772848669499248,
	    clientSecret: "780eb5ea1264de6be92d07c9140886ee",
	    callbackURL: url,
	    enableProof: false
	  },
	  function(accessToken, refreshToken, profile, done) {
	  	console.log(profile);
	  	User.findOne({ 'fb.id': profile.id }, function (err, user) {
	  		if (err) {
	  			return next(err); 	
	  		}
	  		else {
	  			if (! user) {
	  				var newUser = new User({
	  					fb : profile,
	  					accessToken : accessToken
	  				});
	  				
	  				newUser.save(function(err) {
	  					if (err) {
	  						console.log('= ERROR SAVING NEW USER');
	  					}
	  				})

	  			}
	  		}
	  	})
		
		process.nextTick(function (){
			return done(null, profile);
		});
	  }
	));

	app.use(passport.initialize());
	app.use(passport.session());


	app.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { failureRedirect: '/login'}),
	  function(req, res) { 
		res.redirect('/main');
	  });
	  

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

	app.get('*', function(req, res, next) {
		next();
	})

	app.get('/', function(req, res) {
		if (req.user) {
			res.render('main.html');
		}
		else {
			console.log("= NO USER FOUND");
			res.render('login.html')
		}
	});

	app.get('/auth/facebook',
	  passport.authenticate('facebook'), function(req, res){


	  });

	

	app.get('/main', function(req, res) {
		console.log(req.user);
		// if (req.user) {
			res.render('main.html');
		// }
		// else {
		// 	res.render('login.html')
		// }
	});

	app.get('/api/loginInfo', function(req, res) {
		User.findOne({ 'fb.id' : req.user.id }, function(err, user) {
			if (err)
				next(err);
			else {
				if (! user) {
					res.send('User not found!');
				}
				else {
					res.json(user);
				}
			}

		})
	});

	app.get('/api/users', function(req, res) {	
		User.find({}, function(err, users) {
			if (err) {
				res.send(err);
			}
			res.json(users);
		});
	});

};