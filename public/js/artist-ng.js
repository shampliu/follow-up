var app = angular.module('artist', []);

app.controller('artistController', function($scope, $http) {

    $scope.random = function() {
      var num = Math.floor(Math.random() * 22) + 68;
      var string = num + ' F (' + Math.floor((num - 32) * 5/9) + ' C)';
      return string;
    }

    $scope.getWeather = function(lat, lon, index) {
      var temp; 
      var caller = $(this); 
      
      var url1 = "http://api.wunderground.com/api/c33cff0e71aab1f4/geolookup/q/" + lat + "," + lon + ".json";
      $.ajax({
       url : url1,
       dataType : "jsonp",
       success : function(data) {
        console.log(data);
           var state = data.location.state;
           var city = data.location.city;
           // var state = "CA";
           // var city = "Foster City";
           console.log("state = " + state);
           console.log("city = " + city);
           var url2 = "http://api.wunderground.com/api/c33cff0e71aab1f4/geolookup/conditions/q/" + state + "/" + city + ".json"; 
           console.log(url2);

           $.ajax({
                url : url2,
                dataType : "jsonp",
                success : function(parsed_json) {
                  var location = parsed_json['location']['city'];
                  temp = parsed_json['current_observation']['temperature_string'];

                  console.log('THIS');
                  var ind = '#' + index; 
                  $(ind).html(temp);
                  // $(caller).html('HI THERE');
                  // $(caller).innerHTML('hi');
                  // alert("Current temperature in " + location + " is: " + temp_f);
                  // return temp_f; 
                }
            });
       }
      });
    }
    // var artist = $scope.artist;

    $scope.getDate = function(date) {
        return moment(date).fromNow(); 
    }

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

    $scope.getPicture = function(artist) {
      var url = "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" + $scope.artist + "&api_key=171fb2e2186bd06117e222884676d2b4&format=json"
      console.log('ODESZA HERE' + url);
      $http.get(url)
          .success(function(data) {
              console.log("= SIMILAR ARTIST DATA IS HERE")
              console.log(data);
              $scope.picture = data.results.artistmatches.artist[0].image[3]['#text']; 
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });

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
