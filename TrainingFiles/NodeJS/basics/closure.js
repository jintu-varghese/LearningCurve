function greetMaker(name) {
	function greet() {
		console.log('hi ' + name);
	}
	return greet;
}

var greetNoh= greetMaker('Nohin');
var greetJis= greetMaker('Jismy');

console.log(greetNoh.toString());
console.log(greetJis);
greetJis();
greetNoh();


function createAdder(baseNo){
	return function(numberToAdd){
		console.log(baseNo+numberToAdd);
	}
}

var add1= createAdder(1);
var add28= createAdder(28);
var add189= createAdder(189);

add1(324);
add28(345);
add189(300);