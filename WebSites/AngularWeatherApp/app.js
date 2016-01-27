var myApp=angular.module('myApp',['ngRoute','ngResource']);

myApp.controller('homeController',['$scope','cityService',function($scope,cityService,$resource){
    
    $scope.city = cityService.city;
    
    $scope.$watch('city',function(){
        
        cityService.city = $scope.city;
    });
    
}]);

myApp.controller('foreCastController',['$scope','cityService','$resource', '$routeParams',function($scope,cityService,$resource,$routeParams){
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || 2;
    $scope.appid='17cfb7492cb8cebd74044db13993738e';
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days , appid:$scope.appid});
    
    $scope.convertToFH = function(degk){
        
        return Math.round((1.8*(degk - 273))+32);
    }
    
    $scope.convertToDate = function(dt){
        
        return new Date(dt * 1000);
    }
    
}]);

myApp.config(function($routeProvider){
    
    $routeProvider
    
    .when ('/', {
        templateUrl:'pages/home.htm',
        controller: 'homeController'
    })
    
    .when ('/forecast',{
        templateUrl:'pages/forecast.htm',
        controller: 'foreCastController'
    })
    .when ('/forecast/:days',{
        templateUrl:'pages/forecast.htm',
        controller: 'foreCastController'
    })
});


myApp.service('cityService',function(){
    
    this.city="New York, NY";
    
});