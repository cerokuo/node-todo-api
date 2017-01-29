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

	//toArray, return the data in a promise
	db.collection('Todos').find({
		_id: new ObjectID('588bb7276daa150ca4e6b0e5')
	}).toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs, undefined, 2));

	}, (err) =>{ 
		console.log('Uneable to fetch todos', err);
	});


	// Count the number of elements you find.
	db.collection('Todos').find({
		_id: new ObjectID('588bb7276daa150ca4e6b0e5')
	}).count().then((count) => {
		console.log(`Todos count: ${count}`);
	}, (err) =>{ 
		console.log('Uneable to fetch todos', err);
	});


	db.collection('Users').find({
		name: 'Ivan'
	}).toArray().then((docs) => {
		console.log('Users');
		console.log(JSON.stringify(docs, undefined, 2));

	}, (err) =>{ 
		console.log('Uneable to fetch users', err);
	});



	//Get all the Ivan documents in the Users collection
	db.collection('Users').find({
		name: 'Ivan'
	}).count().then((count) =>{
		console.log(`Users count with name Ivan: ${count}`)
	}, (err) =>{
		console.log('Error feteching data', err);
	});


	//close connection with db.
	// db.close();
});	