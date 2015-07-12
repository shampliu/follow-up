var app = angular.module('main', []);

app.controller('mainController', function($scope, $http) {
    
    $http.get('/api/loginInfo')
        .success(function(data) {
            console.log(data);
            $scope.user = data; 
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    
});