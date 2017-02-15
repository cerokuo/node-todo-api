//SHA256 is because is the number of bits.
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var password = '123abc!';


bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(password, salt, (err, hash) =>{
		console.log(hash);
	});
});


var hashedPassword = '$2a$10$HzP86uFNDudZwK23D4XpZuOJngXiljoD09E2EhmuX5LkIpbzQhfYW';

//Compare if the password generated is the same as ours
bcrypt.compare(password, hashedPassword, (err, res) => {
	console.log(res);
});


// var data = {
// 	id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);


// var data = {
// 	id: 4
// };

// var token = {
// 	data,
// 	hash : SHA256(JSON.stringify(data) + 'somesecretcode').toString()
// };


//I try to rehash, but i dont know the somesecretCode, so it's not the same hash code.
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();


// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecretcode').toString();;

// if(resultHash === token.hash) {
// 	console.log('Data was not changed');
// } else {
// 	console.log('Data was changed, do not trust');
// }