console.log("starting pwd manager");

var storage = require('node-persist');
storage.initSync();

//storage.setItemSync('name', 'Jintu');

/*storage.setItemSync('accounts', [{
	userName: "Jintu",
	balance: 0
}]);*/

var name = storage.getItemSync('name');
console.log(name);

var accounts = storage.getItemSync('accounts');
console.log(accounts);

accounts.push({
	userName: 'jismy',
	balance: 100
});

storage.setItemSync('accounts',accounts);

accounts = storage.getItemSync('accounts');
console.log(accounts);