const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User', {
	email: {
		type: String,
		required: true,
		minlenght: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid e-mail'
		}

	},
	password: {
		type: String,
		require: true,
		minlength: 6
	},
	//this is just in mongodb, not in sql db
	tokens: [{
		access: {
			type: String,
			require: true
		},
		token: {
			type: String,
			require: true

		}
	}]

});

module.exports = {
	User
};
