'use strict'

const express = require('express')
const path = require('path')
const thinky = require('./database.js')
const r = thinky.r
const Log = require('./models/log.js')

module.exports = (app) => {
  app.use('/static', express.static(path.join(__dirname, 'public')))

  app.get('/', (req, res) => {
    res.render('home.html', {
      'name': 'Home',
      'page': {
        'js': ['https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js', 'static/home.js']
      }
    })
  })

  app.get('/results', (req, res) => {
    res.render('results.html', {
      'name': 'Results',
      'page': {
        'js': ['static/results.js', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBjA3qcCd-vKs8LKnXEwoZrVLQQLgEeAIQ&callback=initMap']
      }
    })
  })

  app.post('/new', (req, res) => {
    // Save empty object in database
    let hashLink = require('bs58').encode(require('crypto').randomBytes(6))
    new Log({
      'id': hashLink
    }).save().then((user) => {
      console.log(user)
    })
    res.send(hashLink)
  })

  app.get('/l/:id', (req, res) => {
    // Search the database for objects with id = :id (aka hashLink)
  })

  app.post('/l/:id', (req, res) => {
    // create a new trip
  })

  app.post('/search', (req, res) => {
    const searches = req.body.searches
    Log.filter(r.row('cities').contains(city => {
      const name = city('name')
      return searches.reduce((hasCity, search) => {
        if (hasCity) {
          return name.eq(search)
        }

        return false
      }, true)
    })).run().then(values => {
      res.send(values)
    }).error(err => {
      console.log(err)
    })
  })
}
