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
	}
});

module.exports = {
	Todo
};