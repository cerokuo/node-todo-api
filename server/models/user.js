const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');	

//store all the schema of the user
var UserSchema = new mongoose.Schema({
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


//Defined what is going to came back when a mongoose method is transform in tu a JSON value
UserSchema.methods.toJSON = function () {
	var user = this;
	//take a mongoose variable and transforme it into a Object
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);

}

//Here arrow function dont work
UserSchema.methods.generateAuthToken = function ( ) {
	var user = this;
	var access =  'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	user.tokens.push({access, token});

	return user.save().then(() => {
		return token;
	});
};

var User = mongoose.model('User', UserSchema);

module.exports = {
	User
};
