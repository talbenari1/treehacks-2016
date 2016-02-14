'use strict'                                                                                                                                                 
import '../../scss/home.scss'
var app = angular.module('homePage', []);
app.controller('homePageController', function($scope) {
  $scope.waypoints = [];
  //$scope.photo = '';

  function autocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('pac-input')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInBar);
  }

  //grab photos from maps
  function createPhoto(place) {
    var photos = place.photos;
    if (!photos) {
      return;
    } else {
      return photos;
    }
    console.log("got here");
  }
  function fillInBar() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    $scope.waypoints.push(place);
    $scope.$apply();
  }

  // Bias the autocomplete object to the user's geographical location,
  function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }


  angular.element(document).ready(function () {
    autocomplete();
    geolocate();
  })

  $scope.trips = [
      { 
        title: 'The most wonderful trip', 
        citiesVisited: 'Copenhagen, Stockholm, Amsterdam', 
        time: '2 weeks',
        body: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
      }, {
        title: 'iusto odio dignissimos ducimus', 
        citiesVisited: 'qui blanditiis praesentium voluptatum deleniti atque', 
        time: '5 months',
        body: 'quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
      }, {
        title: 'Too many cities, too fast', 
        citiesVisited: 'unde omnis iste natus',
        time: '1 week',
        body: '. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
      }
  ];
  
});

