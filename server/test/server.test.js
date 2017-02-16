const request = require('supertest');
const expect = require('expect');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');
const {todos, populateTodos, users, populateUsers}  = require('./seed/seed');
const {User} = require('./../models/user');


//Before the test are launched the beforeEach will work.
beforeEach(populateUsers);
beforeEach(populateTodos);

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

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });
	it('Should return 404 if todo not found', (done) =>{
		var hexId = new ObjectID().toHexString();
		request(app)
		.delete(`/todos/${hexId}`)
		.expect(404)
		.end(done);
	});

	it('should return 404 if object id is invalid', (done) =>{
		request(app)
		.delete('/todos/123abc')
		.expect(404)
		.end(done);
	});
});

describe('PATCH /todos/:id', () => {
	it('should update the todo', (done) => {
		var hexId = todos[0]._id.toHexString();
		var text = 'new update text to write';

		request(app)
		.patch(`/todos/${hexId}`)
		.send({
			completed : true,
			text: text
		})
		.expect(200)
		.expect((res) => {
        	expect(res.body.todo.text).toBe(text);
        	expect(res.body.todo.completed).toBe(true);
        	expect(res.body.todo.completedAt).toBeA('number');
      	})
		.end(done);
	});

	it('should clear completedAt when todo is notcompleted', (done) => {
		var hexId = todos[1]._id.toHexString();
		var text = 'new update for the second element text';

		request(app)
		.patch(`/todos/${hexId}`)
		.send({
			completed : false,
			text : text
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(text);
			expect(res.body.todo.completed).toBe(false);
			expect(res.body.todo.completedAt).toNotExist();
		})
		.end(done);
	});
});

describe('GET /users/me', ()=>{
	it('should return user if authenticated', (done) => {
		request(app)
		.get('/users/me')
		//declaring a header
		.set('x-auth', users[0].tokens[0].token)
		.expect(200)
		.expect((res) =>{
			expect(res.body._id).toBe(users[0]._id.toHexString());
			expect(res.body.email).toBe(users[0].email);
		})
		.end(done);


	});

	it('should return a 401 if not authenticated', (done)=>{
		request(app)
		.get('/users/me')
		.expect(401)
		.expect((res)=>{
			//the body should be empty, so we compared with an empty
			expect(res.body).toEqual({});
		})
		.end(done);
	});
});

describe('POST /users', () =>{
	it('should create a user',(done)=>{
		var email = 'example@example.com';
		var password = '123mnb!';
		request(app)
		.post('/users')
		.send({email, password})
		.expect(200)
		.expect((res)=> {
			expect(res.headers['x-auth']).toExist();
			expect(res.body._id).toExist();
			expect(res.body.email).toBe(email);
		})
		.end((err) =>{
			if(err) {
				return done(err);
			}
			//if not error, we check if the user exists
			User.findOne({email}).then((user)=> {
				expect(user).toExist();
				expect(user.password).toNotBe(password);
				done();
			}).catch((e) => done(e));
		});

	});
	it('should return validation erros if request invalid',(done)=>{
		var email = 'aaa';
		var password = '123';
		request(app)
		.post('/users')
		.send({email, password})
		.expect(400)
		.end(done);

	});
	it('should not create user if e-mail in use',(done)=>{
		var email = users[0].email;
		var password = '123mbn!';
		request(app)
		.post('/users')
		.send({email,password})
		.expect(400)
		.end(done);
	});
});

describe('POST /users/login', () => {
 it('should login user and return auth token', (done) => {
 	request(app)
 	.post('/users/login')
 	.send({
 		email : users[1].email,
 		password : users[1].password
 	})
 	.expect(200)
 	.expect((res) => {
 		expect(res.headers['x-auth']).toExist();

 	})
 	.end((err, res) => {
 		if(err) {
 			return done(err);
 		} 

 		User.findById(users[1]._id).then((user) => {
 			expect(user.tokens[0]).toInclude({
 				access: 'auth',
 				token: res.headers['x-auth']
 			});
 			done();
 		}).catch((e) => done(e));
 	});
 });

 it('should reject invalid login', (done) => {
 	request(app)
 	.post('/users/login')
 	.send({
 		email: users[1].email,
 		password: users[1].password + '1'
 	})
 	.expect(400)
 	.expect((res) => {
 		expect(res.headers['x-auth']).toNotExist();
 	})
 	.end((err, res) => {
 		if(err) {
 			return done(err);
 		}

 		User.findById(users[1]._id).then((user) => {
 			expect(user.tokens.length).toBe(0);
 			done();
 		}).catch((e) => done(e));
 	});
 });
});


describe('DELETE /users/me/token', () =>{
	it('should remove auth token  on logout', (done) => {
		request(app)
		.delete('/users/me/token')
		.set('x-auth', users[0].tokens[0].token)
		.expect(200)
		.end((err, res) => {
	 		if(err) {
	 			return done(err);
	 		}

	 		User.findById(users[0]._id).then((user) => {
	 			expect(user.tokens.length).toBe(0);
	 			done();
	 		}).catch((e) => done(e));
 		});
	})

})