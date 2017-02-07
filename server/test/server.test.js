const request = require('supertest');
const expect = require('expect');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');


const todos = [{
	_id: new ObjectID(),
	text: 'First test todo'
}, {
	_id: new ObjectID(),
	text: 'Second test todo'
}];


//Before the test are launched the beforeEach will work.
beforeEach((done) =>{
	Todo.remove({}).then(() => {
		//insert all the todos objects
		return Todo.insertMany(todos);
	}).then (() => done());
});

describe('POST/todos', () => {
	it('should create a new Todo', (done) => {
		var text = 'Test todo Text';

		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res) =>{
			expect(res.body.text).toBe(text);
		})
		.end((err, res) => {
			if(err) {
				return done(err);
			}

			Todo.find({text}).then((todos) =>{
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();
			}).catch((e) => done(e));
		});
	});

	it('Should not create todo with invalid  body data', (done) =>  {

		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err, res) => {
			if(err) {
				return done(err);
			}

			Todo.find().then((todos) => {
				expect(todos.length).toBe(2);
				done();
			}).catch((e) => done(e));
		});
	});
});

describe('GET /todos', () => {
	it('Should get all todos', (done) => {
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res) => {
			expect(res.body.todos.length).toBe(2)
		})
		.end(done);
	});
});


describe('GET /todos/:id', () =>{
	it('should retrun todo doc', (done) => {
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res) =>{
			expect(res.body.todo.text).toBe(todos[0].text);
		})
		.end(done);
	});

	it('should return 404 if todo not found', (done) => {
		//make sure you get a 404 back
		var hexId = new ObjectID().toHexString();
		request(app)
		.get(`/todos/${hexId}`)
		.expect(404)
		.end(done);
	});

	it('should retunr 404  for non-object ids', (done) => {
		//todos/123
		request(app)
		.get('/todos/123abc')
		.expect(404)
		.end(done);
	});
});