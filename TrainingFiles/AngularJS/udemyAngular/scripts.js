var myApp = angular.module('myApp', ['ngMessages', 'ngResource', 'ngRoute']);

myApp.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'pages/main.html',        
        controller: 'mainController'
    })
    .when('/Book/:bookId',{
        templateUrl: 'pages/book.html',        
        controller: 'BookController'
    })
    .when('/Book/:bookId/ch/:chapterId',{
        templateUrl: 'pages/chapter.html',        
        controller: 'ChapterController'
    })
    
});

myApp.service('nameService', function(){
    
    var sef=this;
    this.name="John";
    this.nameLength = function(){
       return self.name.length; 
    };
});

myApp.controller('mainController', ['$scope', '$log', '$filter', '$resource', '$timeout', 'nameService', function ($scope, $log, $filter, $resource, $timeout, nameService) {
    
    $scope.name = "Jintu Varghese";
    console.log($scope);
    
    $log.debug('Debug');
    $log.error('Error');
    $log.info('info');
    $log.log('Log');
    $log.warn('Warn');
    
    $scope.formattedNme= $filter('uppercase')($scope.name);
    $log.log($scope.formattedNme);
    
     console.log($resource);
                                    
    $timeout(function(){
            $scope.name= 'Everyone' ;                      
                                    },3000);    
    
    $scope.handle="";
    $scope.formattedhandle= $filter('uppercase')($scope.handle);
     $scope.formattedUpperhandle= function() {
         return $filter('uppercase')($scope.handle);
     };
     
     $scope.$watch('handle', function(newValue, oldValue){
         
         $log.info('changed');
         $log.log(oldValue);
         $log.log(newValue);
     });
    
    
    setTimeout(function(){
        
        $scope.$apply(function(){
        $scope.handle="newHandle";
        $log.info('setTimeout changed');
        
    })},3000);
                                    
     $log.log(nameService.name); 
     $log.log(nameService.nameLength());   
    
    $scope.nameFromService= nameService.name;
    
    $scope.$watch('nameFromService', function(){
        nameService.name = $scope.nameFromService;
    });
                                    
}]);

myApp.controller('BookController', function($scope, $routeParams, nameService) {
             $scope.name = "BookController";
            $scope.params = $routeParams;
            $scope.nameFromService= nameService.name;
     $scope.$watch('nameFromService', function(){
        nameService.name = $scope.nameFromService;
    });
    
        })      
    .controller('ChapterController', function($scope, $routeParams, nameService) {
              $scope.name = "ChapterController";
             $scope.params = $routeParams;
             $scope.nameFromService= nameService.name;
    
     $scope.$watch('nameFromService', function(){
        nameService.name = $scope.nameFromService;
    });
        });

