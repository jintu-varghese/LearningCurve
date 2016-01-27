/*Router*/

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