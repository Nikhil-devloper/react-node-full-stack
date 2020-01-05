const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./RecipientSchema.js');

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recepients: [RecipientSchema], 
	yes: {type: Number, default: 0},
	no: { type: Number, default: 0},
	_user: {
		type: Schema.Types.Object,
		ref:  'User'
	},
	dataSent: Date,
	lastResponded: Date
});

mongoose.model('surveys',surveySchema);
