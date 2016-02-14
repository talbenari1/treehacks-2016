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
    let logs = Log

    searches.forEach((search) => {
      logs = logs.filter(r.row('cities').contains({
        name: search
      }))
    })

    logs.run().then((values) => {
      values = values.map((value) => value.toObject())

      console.log(values[0].constructor)
    }).error((value) => {
      console.log('FAIL')
    })
  })
}
