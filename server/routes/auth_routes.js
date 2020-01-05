const express= require('express');
const router= express.Router();
const passport  = require('passport');
const keys = require('../config/keys');


router.get('/auth/google',
	passport.authenticate('google',{
		scope: ['profile','email']
	})
);

// // Route 
// When Reqest came to /auth/google
// concsent scrren open. --> asking user permision if & only if user granted permision then passport.authenticate
// set a route in which googele given code.

// saying i have set the code (specified URL/code) (Now this route is Ready) Just come here & get code.
// but what you will do with that code, i have to send that code again to you. in order to get user profile info.


//Magically this callback URL is send back to client localhost:3000/auth/google/callback
router.get('/auth/google/callback',passport.authenticate('google'),(req,res) => {
	res.redirect('/surveys');
});

/** Need to change the place **/
router.get('/api/current_user',(req,res) => {
	res.send(req.user);
});



router.get('/api/protected',(req,res,next) => {
	if(req.user) {
		next();
	}
	else {
		res.send('You are Not Logged In');
	}
},(req,res) => {
	res.send(req.user);
});



router.get('/api/logout',(req,res) => {
	console.log('trying to logout');
	console.log(req.session);
	req.logOut();

	// I did to remove Cookies in my browser.
	//What passport does is even if user send it removes that. 
	
	//req.session= null; 

	res.redirect('/');
	
});

module.exports = router;