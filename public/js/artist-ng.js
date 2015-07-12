var app = angular.module('artist', []);

app.controller('artistController', function($scope, $http) {
    // var artist = $scope.artist;

    $http.get('../api/loginInfo')
        .success(function(data) {
            console.log('= LOGIN INFO');
            console.log(data);
            $scope.user = data; 
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.toPercent = function(n) {
        return (Math.floor(n * 100)); 
    }

    $scope.getSimilar = function(artist) {
        var url = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + $scope.artist + "&api_key=171fb2e2186bd06117e222884676d2b4&format=json"
        $http.get(url)
            .success(function(data) {
                console.log("= SIMILAR ARTIST DATA IS HERE")
                console.log(data);
                $scope.similarArtists = data; 
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.getEvents = function(artist) {
        var url = "http://ws.audioscrobbler.com/2.0/?method=artist.getevents&artist=" + $scope.artist + "&api_key=171fb2e2186bd06117e222884676d2b4&format=json"
        $http.get(url)
            .success(function(data) {
                console.log("= EVENT DATA IS HERE")
                console.log(data);
                $scope.events = data; 
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    
});
