/* globals google angular recents */

'use strict'

import '../../scss/home.scss'
let app = angular.module('homePage', [])
app.controller('homePageController', function ($scope) {
  $scope.waypoints = []
  let autocomplete

  function initAutocomplete () {
    // Create the autocomplete object, restricting the search to geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('pac-input')), { types: ['geocode'] })

    // When the user selects an address from the dropdown, populate the address fields in the form.
    autocomplete.addListener('place_changed', fillInBar)
  }

  function fillInBar () {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace()
    $scope.waypoints.push(place)
    $scope.$apply()
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

  angular.element(document).ready(() => {
    initAutocomplete()
    geolocate()
  })

  $scope.trips = recents
})
