const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');

router.get('/api/surveys',requireLogin,async (req,res) => {
	
	const surveys = await Survey.find({_user: req.user.id});
	res.send(surveys);
	
});

router.post('/api/surveys',requireLogin,requireCredits,async (req,res) => {

	const { title, subject , body, recepients = []} = req.body;

	const survey = new Survey({
		title,
		subject,
		body,
		recepients: recepients.split(',').map(email => ({ email: email.trim(),responded: false })),
		_user: req.user.id,
		dateSent: Date.now(),
	});

	//Great Place to send an email.	
	const mailer = new Mailer(survey, surveyTemplate(survey));

	try {
			await mailer.send();
			await survey.save();
		req.user.credits -= 1;
		const user = await req.user.save();
		res.send(user);
	} catch(err) {
		console.log('err',err);
		
		res.status(422).send(err);
	}
});

router.post('/api/webhook',(req,res) => {	
	const p = new Path('/api/surveys/:surveyId/:choice');
	const events  = 
	_.chain(req.body)
	.map(({email ,url }) => {
		const pathname = new URL(url).pathname;		
		const match = p.test(pathname);
		if(match) {
			return {
				email: email,
				surveyId: match.surveyId,
				choice: match.choice	
			}
		};
	})
	.compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recepients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recepients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

	console.log('events',events);
	
	res.send({});

});








module.exports = router;