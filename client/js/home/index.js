/* globals google angular recents */

'use strict'

import '../../scss/home.scss'
let app = angular.module('homePage', [])
app.controller('homePageController', function ($scope) {
  $scope.waypoints = []

  recents.forEach(recent => {
    recent.cities = recent.cities.map(city => city.name).join(', ')
  })

  $scope.trips = recents
  let autocomplete

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
})
