const{ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');



/*//Remove all the documents of a collection
Todo.remove({}).then((result) => {
	console.log(result);
})

//Remove just the one you find
Todo.findOneAndRemove(_id: '589b322fd3e82d7768874919').then((todo) => {
	console.log(result);
})
*/
//Find by ID and remove
Todo.findByIdAndRemove('5899eb82f188181d840d54dc').then((todo) => {
	console.log('todo', todo);
});

