var main = angular.module('main', []);

function mainController($scope, $http) {

    $scope.getSimilar = function() {
    }

    // $scope.seePlace = function(place) {

    //     $scope.placeId = place._id;

    //     $('.card-modal')
    //       .modal({
    //         blurring: true
    //       })
    //       .modal('show')
    //     ;

    //     //get user's info and display
    //     $http.get('/api/user/' + place.requester.facebookId)
    //         .success(function(data){
    //             $scope.modalData = data;
    //         });

    //     //get mutual likes
    //     // var m = moment(place.time).fromNow();
    //     // console.log(m);
    //     console.log(place.requester.facebookId);
    //     var url = 'https://graph.facebook.com/' + place.requester.facebookId + '?fields=context.fields%28mutual_likes%29&access_token=' + $scope.loginInfo.accessToken; 
    //     $http.get(url)
    //         .success(function(data) {
    //             console.log('Mutual likes = ' + data.context.mutual_likes.summary.total_count);
    //         })
    //         .error(function(data) {
    //             console.log('Error: ' + data);
    //         });
    // }

    // $http.get('/api/places')
    //     .success(function(data) {
    //         $scope.places = data;
    //         console.log("PLACES DATA IS HERE vvv")
    //         console.log(data);
    //     })
    //     .error(function(data) {
    //         console.log('Error: ' + data);
    //     });


}

