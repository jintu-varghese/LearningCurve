function doNotWork(){
throw new Error('Unable to decrypt');	
}

try{
doNotWork();
}
catch(e){
console.log('something went wrong');
console.log(e);
console.log(e.message);
}
console.log('End');