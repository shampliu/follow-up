// Invoke 'strict' JavaScript mode
'use strict';

var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,
	mongoose = require('../../config/mongoose')();

var User = mongoose.model('User');



// Define the routes module' method
module.exports = function(app) {
	var Gracenote = require("node-gracenote");
	var clientId = "713984";
	var clientTag = "6284A0B7013D83EC0C76E06CEDA2D2A2";
	var userId = "280161755755239257-279103D3E8992B2660A9AD29E5CD5401";

	var api = new Gracenote(clientId,clientTag,userId);
	api.register(function(err, uid) {
	    // store this somewhere for the next session
	});

	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});

	var url; 
	if (process.env.NODE_ENV === 'development') {
		url = "http://localhost:8081/auth/facebook/callback";
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
	  	User.findOne({ 'fb.id': profile.id }, function (err, user) {
	  		if (err) {
	  			return next(err); 	
	  		}
	  		else {
	  			if (! user) {
	  				var newUser = new User({
	  					fb : profile,
	  					accessToken : accessToken,
	  					data : []
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
			res.render('main.ejs');
		}
		else {
			res.render('login.html')
		}
	});

	app.get('/auth/facebook',
	  passport.authenticate('facebook'), function(req, res){


	  });

	app.get('/artist/:name', function(req, res) {
		// res.send('hi!' + req.params.name);
		// api.searchTrack("Kings of Leon", "Only by the Night", "Sex on fire", function(err, result) {
		//     // Search Result as array
		//     console.log('TRACK FOUND');
		//     console.log(result);
		// });
		api.searchTrack("Kings of Leon", "Only by the Night", "Sex on fire", function(err, result) {
		    // Search Result as array
		    // console.log('TRACK FOUND');
		    // console.log(result);
		});
		api.searchArtist(req.params.name, function(result) {
			console.log(result);
		    // Search Result as array
		});
		res.render('artist.ejs', {
			artist: req.params.name
		})


	})

	

	app.get('/main', function(req, res) {
		console.log(req.user);
		// if (req.user) {
			res.render('main.ejs');
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