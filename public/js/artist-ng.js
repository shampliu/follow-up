var app = angular.module('artist', []);

app.controller('artistController', function($scope, $http) {
    var artist = $scope.artist;

    $scope.getSimilar = function(artist) {
        var url = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + $scope.artist + "&api_key=171fb2e2186bd06117e222884676d2b4&format=json"
        $http.get(url)
            .success(function(data) {
                console.log("= DATA IS HERE")
                console.log(data);
                $scope.similarArtists = data; 
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    
});
