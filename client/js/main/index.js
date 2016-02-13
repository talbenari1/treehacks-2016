/* global google */

'use strict'

import '../../scss/main.scss'

window.initMap = () => {
  google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  })
}
