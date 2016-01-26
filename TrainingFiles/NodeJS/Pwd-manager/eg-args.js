var argv= require('yargs')
.command('hello', 'Greet user', function (yargs) {
   yargs.options({
   	fname:{
   		demand: true,
   		alias: 'fn',
   		description: 'First Name',
   		type: 'string'

   	},
   	lname:{
   		demand: true,
   		alias: 'ln',
   		description: 'Last Name',
   		type: 'string'
   	}
   }).help('help');
})
.help('help')
.argv;

console.log(argv);

if(argv._[0] === "hello"  && typeof argv.fname !== 'undefined' && typeof argv.lname !== 'undefined'){
	console.log(argv._[0] +' ' +argv.fname  + ' ' +  argv.lname);
}
else{
	console.log('hello '+ ' world');
}