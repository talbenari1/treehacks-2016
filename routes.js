'use strict'

const express = require('express')
const path = require('path')
const models = require('./models')

module.exports = (app) => {
  app.use('/static', express.static(path.join(__dirname, 'public')))

  app.get('/', (req, res) => {
    res.render('index.html', {
      'page': {
        'js': ['static/main.js', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBjA3qcCd-vKs8LKnXEwoZrVLQQLgEeAIQ&callback=initMap']
      }
    })
  })

  app.get('/l/:id', (req, res) => {
    // return the trip
  })

  app.post('/l/:id', (req, res) => {
    // create a new trip
  })

  app.get('/search', (req, res) => {
    // return a series of results
  })
}
