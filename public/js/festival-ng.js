var app = angular.module('festival', []);

app.controller('festivalController', function($scope, $http) {
    
    $http.get('/api/loginInfo')
        .success(function(data) {
            console.log(data);
            $scope.user = data; 
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    
});