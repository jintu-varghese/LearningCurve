// bank account
var accounts =[];

// create account

function createAccount(account){

	accounts.push(account);
	return account;

}

//getAccount
function getAccount(userName){

var matchedAccount;
for(var i=0;i<accounts.length;i++){

	if(accounts[i].userName===userName){
		matchedAccount=accounts[i];
		break;
	}
}
return matchedAccount;
}



//deposit

function deposit(account,amount)
{

	if(typeof amount !== 'number')
	{
		console.log('Ammount should be a Number');
	}
	else
	account.balance = account.balance + amount;

}

//withdraw

function withdraw(account,amount)
{

	if(typeof amount !== 'number')
	{
		console.log('Ammount should be a Number');
	}
	else
	 account.balance -= amount;
}

//getbalance

function getbalance(account)
{
console.log(account.balance);
}


function createBalanceGetter(account){
	return function() {

		console.log( 'Balance for Account '+ account.userName + ' is ' + account.balance);
	}
}




var john= createAccount({
	userName:"johnun",
	balance:0
});

var dohn= createAccount({
	userName:"dohnun",
	balance:0
});

deposit(john,10000);
deposit(john,{});
deposit(dohn,20000);
deposit(dohn,"hi");


withdraw(john,100);
withdraw(john,{});
withdraw(dohn,200);
withdraw(dohn,"hi");


getbalance(john);
getbalance(dohn);


var johnAccount= getAccount("johnun");
var dohnAccount= getAccount("dohnun");

console.log(johnAccount);
console.log(dohnAccount);


var johnBalance=createBalanceGetter(john);
var dohnBalance=createBalanceGetter(dohn);

johnBalance();
dohnBalance();


