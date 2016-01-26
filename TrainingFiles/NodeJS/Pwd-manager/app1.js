console.log("starting pwd manager");

var crypto=require('crypto-js');
var storage = require('node-persist');
storage.initSync();

var argv= require('yargs')
  .command('create','create New Account', function (yargs) {
        yargs.options({
        	accountName:{
        		demand : true,
        		alias : 'an',
        		description : 'Account Name',
        		type : 'string'
        	},
        	userName:{
        		demand : true,
        		alias : 'un',
        		description : 'User Name',
        		type : 'string'
        	},
        	passWord:{
        		demand : true,
        		alias : 'pwd',
        		description : 'Password',
        		type : 'string'
        	},
          masterPwd:{
            demand:true,
            alias: 'mpwd',
            description: 'Master Pwd',
            type: 'string'
          }
        }).help('help');
  })
  .command('get', 'get Account Details', function (yargs){
         yargs.options({
         	accountName:{
        		demand : true,
        		alias : 'an',
        		description : 'Account Name',
        		type : 'string'
        	},

          masterPwd:{
            demand:true,
            alias: 'mpwd',
            description: 'Master Pwd',
            type: 'string'
          }
        }).help('help');
  })
  .help('help')
  .argv;

var command= argv._[0];

 

function getAccounts(masterPassword){
  var encAccounts= storage.getItemSync('accounts');
  var decryptedAccountsArray=[];
  if (typeof encAccounts !== 'undefined'){
   var bytes = crypto.AES.decrypt(encAccounts, masterPassword);
   decryptedAccounts = bytes.toString(crypto.enc.Utf8);
   decryptedAccountsArray=JSON.parse(decryptedAccounts);
 }
 console.log('getAcc------------');
 console.log(decryptedAccountsArray);
 return decryptedAccountsArray;
}

function saveAccounts(accounts,masterPassword){
  
  console.log('save-------');
  var accountsString = JSON.stringify(accounts);
  var encryptedAccounts = crypto.AES.encrypt(accountsString, masterPassword);
  storage.setItemSync('accounts',encryptedAccounts.toString());
  return accounts;
}




function creatAccount(account,masterPassword){

  var accounts = getAccounts(masterPassword);
  accounts.push(account);
  saveAccounts(accounts,masterPassword);

	/*var accounts= storage.getItemSync('accounts');
	if (typeof accounts === 'undefined')
		accounts=[];
		
	    accounts.push(account);
		storage.setItemSync('accounts',accounts);*/

	return account;
}

function getAccount(accountName,masterPassword){
  var accounts = getAccounts(masterPassword);
	var matchedAccount;
	//var accounts= storage.getItemSync('accounts');
	if (typeof accounts === 'undefined')
		console.log('No Accounts Available');
	else{
		for (var i=0; i<accounts.length; i++){
			if(accounts[i].accountName === accountName)
				matchedAccount= accounts[i];
		}
	}
	return matchedAccount;
}


/*var jintuAccount=creatAccount({
	accountName: "FB",
	userName: "jintuv",
	passWord: "jintupwd"
});

var jintuAccount=creatAccount({
	accountName: "FB",
	userName: "jismyk",
	passWord: "jismypwd"
});*/

//var accounts= storage.getItemSync('accounts');
//console.log(accounts);

//var fbaccounts= getAccount('FB');
//console.log(fbaccounts);


if (command === 'create'){
  try{
var createdAccount = creatAccount({
	accountName: argv.accountName,
	userName: argv.userName,
	passWord: argv.passWord
},argv.masterPwd);
console.log('Account Created');
console.log(createdAccount)}
catch(e){
  console.log(e.message);
}

}else if (command === 'get')
{
  try{
  var fetchAccount = getAccount(argv.accountName,argv.masterPwd);
  if (typeof fetchAccount === 'undefined')
  	console.log('Account Not found');
  else{
  	console.log('Account found');
  	console.log(fetchAccount);
  }
}catch(e){
  console.log(e.message);
}
}


