var mongoose = require('mongoose');


// Allow us to use promises
mongoose.Promise = global.Promise;
// Connect to the DDBB
mongoose.connect('mongodb://localhost:27017/TodoApp');


// creating a model
var Todo = mongoose.model('Todo', {
	text: {
		type: String
	},
	completed: {
		type: Boolean
	},
	completedAt: {
		type: Number
	}
});


var newTodo = new Todo({
	text: 'Cooke dinner'
});

var overTodo = new Todo({
	text: 'Cooke dinner two',
	completed: true,
	completedAt: 20170101
});


overTodo.save().then((doc) => {
	console.log(JSON.stringify(doc, undefined, 2));
}, (e) =>{
	console.log('unable to save overTodo');
} )

//Save return a promise
newTodo.save().then((doc) => {
	console.log('Saved Todo', doc);
}, (e) => {
	console.log('unable to save Todo')
});