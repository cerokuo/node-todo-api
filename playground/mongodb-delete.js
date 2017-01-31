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

	// deleteMany to delete a lot
/*	db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) =>{
		console.log(result);
	})*/;
	
	// deleteOne allow you to delete just the first one that it found
	/*db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
		console.log(result);
	});
	*/
	// findOneAndDelete is gonna find one and delete it. Also he will tell you what document it deletes.
	// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
	// 	console.log(result);
	// });
	
	
	//Delete all the documents that have the name Ivan
	// db.collection('Users').deleteMany({name: 'Ivan'}).then((result) => {
	//    console.log(result);
	// });

	//findOneAndDelete with the id ObjectId("588bbcfabdd285124c95d834")
	db.collection('Users').findOneAndDelete({_id: new ObjectID('588bbcfabdd285124c95d834')}).then((result) =>{
		console.log(result);
	});

	//close connection with db.
	// db.close();
});	