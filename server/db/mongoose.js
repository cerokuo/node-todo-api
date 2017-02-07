var mongoose = require('mongoose');

// Allow us to use promises
mongoose.Promise = global.Promise;
// Connect to the DDBB
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};