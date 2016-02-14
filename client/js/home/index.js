/* globals google angular recents */

'use strict'

import '../../scss/home.scss'
import '../../scss/log.scss'
let app = angular.module('homePage', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/l/:id', {
        templateUrl: '../../templates/log.html',
        controller: 'HomePageController',
      })
      .when('/', {
        templateUrl: '../../templates/search.html',
        controller: 'HomePageController',
      });

//    $locationProvider.html5Mode(true);
}]);

app.controller('HomePageController', ['$scope','$http', '$window', '$location', '$route', function ($scope, $http, $window, $location, $route) {
  $scope.moment = $window.moment
  $scope.waypoints = [];
  //$scope.photo = '';
  let autocomplete;

  $scope.trips = getVisitedCities(recents)

  function getVisitedCities (logs) {
    logs.forEach(log => {
      if (typeof log.cities !== 'string') {
        log.citiesVisited = log.cities.map(city => city.name).join(', ')
      }
    })
    return logs
  }

  function initAutocomplete () {
    // Create the autocomplete object, restricting the search to geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('pac-input')), { types: ['geocode'] })

    // When the user selects an address from the dropdown, populate the address fields in the form.
    autocomplete.addListener('place_changed', fillInBar)
  }

  // grab photos from maps
  function createPhoto (place) { // eslint-disable-line no-unused-vars
    var photos = place.photos
    if (!photos) {
      return
    } else {
      return photos
    }
  }

  // contains text to send to server
  var data = {
    searches: []
  }

  function fillInBar() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    $scope.waypoints.push(place);
    data.searches.push(place.formatted_address);
    requestServer(data);
    $scope.$apply();
  }

  // Bias the autocomplete object to the user's geographical location,
  function geolocate () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          'lat': position.coords.latitude,
          'lng': position.coords.longitude
        }
        const circle = new google.maps.Circle({
          'center': geolocation,
          'radius': position.coords.accuracy
        })
        autocomplete.setBounds(circle.getBounds())
      })
    }
  }

  function requestServer() {
    return $http.post('/search', data).then(function(res) {
      $scope.trips = getVisitedCities(res.data);
    }, function() {
      console.log("you failed, but don\'t ever let you stop that from trying again and again! We believe in you!");
    });
  }

  $scope.initMap = function() {
    if ($location.path().indexOf('/l/') === 0) {
      console.log(document.getElementById('map'));
      new google.maps.Map(document.getElementById('map'), { // eslint-disable-line no-new
        center: { lat: 39.8282, lng: -98.5795 },
        zoom: 5,
        disableDefaultUI: true
      })
    }
  }

  $scope.generateMap = function(trip) {
    $location.path('/l/'+ trip.id);
  }

  angular.element(document).ready(function () {
    initAutocomplete();
    geolocate();
  });
}]);
