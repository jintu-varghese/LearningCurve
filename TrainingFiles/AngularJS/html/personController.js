var app = angular.module('myApp', []);
app.controller('personCtrl', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.names = [
        {name:'Jani',country:'Norway'},
        {name:'Hege',country:'Sweden'},
        {name:'Kai',country:'Denmark'}
    ];
    $scope.quantity = 0;
    $scope.price = 0;
    $scope.fullName = function() {
        return $scope.firstName + " " + $scope.lastName;
    }
});
