const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	googleId: String,
	credits: { type: Number, default: 0 }
});

mongoose.model('users',userSchema);
console.log('Registered');

//write why we don't export mongoose models
//Two argument means we are feeding it
//One argument means we are taking it.