const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const{ObjectID} = require('mongodb');

var id = '5898aee1912f0acc1f98a034';

if(!ObjectID.isValid(id)) {
	console.log('ID not valid');
}

Todo.find ({
	//mongoose transform the var id into a object id.
	_id: id
}).then((todos) => {
	console.log('Todos', todos);
});

// exactly the same as find, but just retunr one result.
Todo.findOne({
	//mongoose transform the var id into a object id.
	_id: id
	//just Todo since its going to be just one element, not a Todos elements.
}).then((todo) => {
	console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
	if(!todo) {
		return console.log('id not found');
	}
	console.log('Todo by id', todo);
}).catch((e) => console.log(e));

//Same as before but with Users ddbb

 var idUser = '58920e8edef2993c305945d4';

if(!ObjectID.isValid(idUser)) {
	console.log('ID not valid');
}

User.find({
	_id:idUser
}).then((users) =>{
	console.log('users',users);
});

User.findOne({
	_id:idUser
}).then((user) =>{
	console.log('user', user);
});

User.findById(idUser).then((user) =>{
	if(!user) {
		return console.log('id user not found');
	}
	console.log(JSON.stringify(user, undefined, 2));
}).catch((e)=> console.log(e));
