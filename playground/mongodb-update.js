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

//findeOneAndUpate, find one object and update the document
	db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID('588d3e875b564b828bdf4604')
	}, {
		$set: {
			completed: true
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});


	// Update your name in ddbb and increment 1 your age
	db.collection('Users').findOneAndUpdate({
		name: 'Rodolfo'
	},{
		$set: {name: 'Pepe'},
		$inc: {age: 1}

	},{
		returnOriginal: false
	}).then((result) => {
		console.log(result)
	});
	//close connection with db.
	// db.close();
});	