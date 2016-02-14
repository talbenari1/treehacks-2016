/* global google */

'use strict'

import '../../scss/log.scss'

window.initMap = () => {
  new google.maps.Map(document.getElementById('map'), { // eslint-disable-line no-new
    center: { lat: 39.8282, lng: -98.5795 },
    zoom: 5,
    disableDefaultUI: true
  })
}
