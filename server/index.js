const express = require('express');
const mongoose = require('mongoose');

const cookieSession = require('cookie-session');

const passport = require('passport');

const app = express();
const keys = require('./config/keys.js');
const bodyParser = require('body-parser');

mongoose.set('useUnifiedTopology', true);
mongoose.connect(keys.mongoDbUrl,{useNewUrlParser: true}).then((msg) => {

}).catch((err) => {

})

app.use(bodyParser());

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		//maxAge: 6000 * 10,
		keys: [keys.CookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./models/User.js');
require('./models/survey.js'); // i have added
require('./services/passport.js');

console.log('hello');

app.get('/api/surveys/thanks',(req,res) => {
	console.log('hello inside thanks');
	res.send('Thanks for voting');
});

//*** very bad aproach of Routing -->
const userRouter = require('./routes/auth_routes.js');
app.use('/',userRouter);

const billingRouter = require('./routes/billingRoutes.js');
app.use('/',billingRouter);



const surveyRouter =  require('./routes/surveyRouter.js');
app.use('/',surveyRouter);



if(process.env.NODE_ENV === 'production') {

	//Express will serve up production assets like our main.js file or main.css file!
	app.use(express.static('client/build'));
	const path = require('path');

	//Express will serve up index.html file if it doesn't recognize the route.

	app.get('*',(req,res) => {
		res.sendFile(path.resolve(__dirname,'client','build','index.html'));
	});
}

const PORT = process.env.PORT || 5000;
console.log('PORT',PORT);

app.listen(PORT);