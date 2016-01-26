var myApp = angular.module('myApp', []);
myApp.controller('mainController', ['$scope', function($scope){
    
    $scope.people = [{
        name : "john doe",
        address :"3655 pruneridge Avenue"
    },
      {
        name : "Jane doe",
        address :"222 California Avenue"
    },
      {
        name : "Sub doe",
        address :"111 third Avenue"
    }              ],
    $scope.greeting = function(person){
        return 'Hi ' + person.name;
    }
    
}]);
myApp.directive('searchResult',function(){
    
    return{
        restrict: 'AECM',
        // template:'<a href="#"><h4>Doe,john</h4><p>3655 pruneridge Avenue</p></a>',
        templateUrl: 'template.html',
        replace:true,
        scope:{
            personName : "@",
            personAddress : "@",
            personObject : "=",
            greetingFunction: "&"
            
        }
    }
});