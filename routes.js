'use strict'

const express = require('express')
const path = require('path')

module.exports = (app) => {
  app.use('/static', express.static(path.join(__dirname, 'public')))

  app.get('/', (req, res) => {
    res.render('home.html', {
      'page': {
        'js': ['static/home.js']
      }
    })
  })

  app.get('/results', (req, res) => {
    res.render('results.html', {
      'page': {
        'js': ['static/results.js', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBjA3qcCd-vKs8LKnXEwoZrVLQQLgEeAIQ&callback=initMap']
      }
    })
  })

/*  
  app.get('/home',(req, res) => {
    res.render('home.html', {
      'page': {
          'name': 'Home',
          'js' : ['static/home.js',]
  }
*/
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
