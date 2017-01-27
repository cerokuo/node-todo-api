//const MongoClient = require('mongodb').MongoClient;

//this const is equal to the same as line 1.
const {MongoClient, ObjectID} = require('mongodb');


/*var user = {name: 'Ivan', age: 32};
//Way to create variables with data of an object.
var {name} = user;
console.log(name);*/

//Connection to MangoDDBB
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
	if(err) {
		//we use return, to stop de function after the execution of return.
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	db.collection('Todos').insertOne({
		text: 'Something to do',
		completed: false
	}, (err, result) => {
		if(err) {
			return console.log('Unable to  insert todo',  err);
		}
		console.log(JSON.stringify(result.ops, undefined, 2));
	});

	//Insert new document into Users Collection(name, age, location)
	db.collection('Users').insertOne({
		name: 'Ivan',
		age: 23,
		location: 'Toronto'
	}, (err, result) => {
		if(err) {
			return console.log('Unable to insert user', err);
		}
		console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
	})

	//close connection with db.
	db.close();
});	