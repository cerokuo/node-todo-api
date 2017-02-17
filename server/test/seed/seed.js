const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user') ;
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
	//user with auth token
	_id: userOneId,
	email: 'ivan@ivanexample.com',
	password: 'userOnePass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
	}]
	}, {
		//user without auth token
		_id: userTwoId,
		email: 'pepe@pepeexample.com',
		password: 'userTwoPass',
		tokens: [{
			access: 'auth',
			token: jwt.sign({_id: userTwoId, access: 'auth'}, 'abc123').toString()
	}]

	}];

const todos = [{
	_id: new ObjectID(),
	text: 'First test todo',
	_creator: userOneId
}, {
	_id: new ObjectID(),
	text: 'Second test todo',
	_creator: userTwoId, 
	completed: true,
	completedAt: 333
}];

const populateTodos = (done) =>{
	Todo.remove({}).then(() => {
		//insert all the todos objects
		return Todo.insertMany(todos);
	}).then (() => done());
};


const populateUsers = (done) =>{
	User.remove({}).then(()=>{
		//create users in ddbb
		var userOne =  new User(users[0]).save();
		var userTwo =  new User(users[1]).save();

		//Takes an array of promises and "then" callback is not going
		//to be fired until the promise userOne and userTwo are done.
		return Promise.all([userOne, userTwo]);
	}).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};