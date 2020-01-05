//keys.js figure out what set of credential to return.

if(process.env.NODE_ENV === 'production') {
	//we are in production - return the production set of keys.
	module.exports = require('./prod');
	console.log("running on production");
}
else {
	//we are in developement - return the dev keys.
	module.exports = require('./dev');
	console.log("running on developement");
	
}