const express = require('express');
const router = express.Router();
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

router.post('/api/stripe',async (req,res) => {

	if(!req.user) {
		return res.status(401).send({ error: 'You must log in'});
	}

	try {
		
		const charge = await stripe.charges.create({
		amount: 500,
		currency: 'INR',
		description: '5$ for 5 Credit',
		source: req.body.id
		});	
		// without checking sir assume payment succesull.
		req.user.credits += 5;
		const user = await req.user.save();
		console.log('send res');
		res.send(user);

	}
	catch(err) {
		console.log(err);
	}

});

module.exports = router;