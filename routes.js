'use strict'

const express = require('express')
const path = require('path')
const thinky = require('./database.js')
const Log = require('./models/log.js')

module.exports = (app) => {
  app.use('/static', express.static(path.join(__dirname, 'public')))

  app.get('/', (req, res) => {
    res.render('index.html', {
      'page': {
        'js': ['static/main.js', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBjA3qcCd-vKs8LKnXEwoZrVLQQLgEeAIQ&callback=initMap']
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

  app.put('/l/:id', (req, res) => {
    let objectId = req.params.id
    const body = req.body

    const newLog = new Log({
      title: 
    }).save()
    .then((log) => {

    }).error((err) => {

    })
  })

  app.get('/search', (req, res) => {
    // return a series of results
  })
}
