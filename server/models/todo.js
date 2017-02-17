var mongoose = require('mongoose');
// creating a model
var Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true, //the value has to exits
		minlenght: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	},
	_creator: {
		// this property allow us to get info from the User Schema.
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
});

module.exports = {Todo};



