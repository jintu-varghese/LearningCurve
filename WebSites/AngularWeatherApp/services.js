
myApp.service('cityService',function(){
    
    this.city="New York, NY";
    
});

myApp.service('weatherService',['$resource',function($resource){
    
    this.getWeather=function(city,days,appid){
        var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
        return weatherResult = weatherAPI.get({ q: city, cnt: days, appid: appid });
    }
}]);