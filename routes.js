'use strict'

const express = require('express')
const path = require('path')
const r = require('./database').r
const models = require('./models')

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

  app.get('/new', (req, res) => {
    res.render('new.html', {
      'page': {
        'name': 'new'
      }
    })
  })

  app.get('/l/:id', (req, res) => {
    // return the trip
  })

  app.post('/l/:id', (req, res) => {
    // create a new trip
  })

  app.post('/search', (req, res) => {
    const searches = req.body.searches
    let logs = models.Log

    searches.forEach(search => {
      logs = logs.filter(r.row('cities').contains({
        name: search
      }))
    })

    logs.run().then(values => {
      values = values.map(value => value.toObject())

      console.log(values[0].constructor)
    }).error(value => {
      console.log('FAIL')
    })
  })
}
