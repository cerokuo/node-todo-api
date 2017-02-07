var mongoose = require('mongoose');

// Allow us to use promises
mongoose.Promise = global.Promise;
// Connect to the DDBB
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds145649.mlab.com:45649/node-course-ddbb' ||'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};