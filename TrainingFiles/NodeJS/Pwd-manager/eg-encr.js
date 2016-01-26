var crypto=require('crypto-js');
var secretMessage = 'i hid something';

var secretKey = '4568';

var encryptedMessage = crypto.AES.encrypt(secretMessage,secretKey);
console.log('Encrypted - ' + encryptedMessage);

var bytes = crypto.AES.decrypt(encryptedMessage, secretKey);
var decryptedMsg = bytes.toString(crypto.enc.Utf8);

console.log('Decrypted -' + decryptedMsg);


var newsecretMessage = {
	name: 'Jintu',
	secretName: '007'
};

var newsecretMessageString = JSON.stringify(newsecretMessage);
var newencryptedMessage = crypto.AES.encrypt(newsecretMessageString,secretKey);
console.log('Encrypted - ' + newencryptedMessage);


var newbytes = crypto.AES.decrypt(newencryptedMessage, secretKey);
var newdecryptedMsg = newbytes.toString(crypto.enc.Utf8);
console.log('Decrypted -' + newdecryptedMsg);

var newdecryptedMsgObject = JSON.parse(newdecryptedMsg);
console.log(newdecryptedMsgObject.name);