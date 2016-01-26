// bank account

var accounts =[];


var account = {
	userName:"",
	balance:0
};

// create account

function createAccount(account){

	accounts.push(account);
	return account;

}

//getAccount
function getAccount(userName){

var matchedAccount;
accounts.forEach(function(a){
	if(a.userName===userName)
		matchedAccount=a;
});
return matchedAccount;

}



//deposit

function deposit(account,amount)
{
 account.balance = account.balance + amount;

}

//withdraw

function withdraw(account,amount)
{
	 account.balance -= amount;
}

//getbalance

function getbalance(account)
{
console.log(account.balance);
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
withdraw(john,200);
getbalance(john);

deposit(dohn,20000);
withdraw(dohn,200);
getbalance(dohn);

console.log(getAccount("johnun"));
console.log(getAccount("dohnun"));

console.log(accounts);


