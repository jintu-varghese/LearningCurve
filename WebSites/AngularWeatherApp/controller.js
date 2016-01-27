myApp.controller('homeController',['$scope','cityService','$location',function($scope,cityService,$location){
    
    $scope.city = cityService.city;
    
    $scope.$watch('city',function(){
        
        cityService.city = $scope.city;
    });
    
    $scope.submit = function(){

        $location.path("/forecast");
    }
    
}]);

myApp.controller('foreCastController',['$scope','cityService', '$routeParams','weatherService',function($scope,cityService,$routeParams,weatherService){
    
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';
    $scope.appid='17cfb7492cb8cebd74044db13993738e';
    $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days,$scope.appid);
        
    $scope.convertToFH = function(degk){
        
        return Math.round((1.8*(degk - 273))+32);
    }
    
    $scope.convertToDate = function(dt){
        
        return new Date(dt * 1000);
    }
    
}]);