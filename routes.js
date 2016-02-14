'use strict'

const express = require('express')
const path = require('path')
const util = require('./util.js')

const thinky = require('./database.js')
const r = thinky.r
const Log = require('./models/log.js')

module.exports = (app) => {
  app.use('/static', express.static(path.join(__dirname, 'public')))

  app.get('/', (req, res) => {
    r.table('Log').orderBy({ 'index': 'log_create_date' }).limit(10).run().then((recents) => {
      res.render('index.html', {
        'page': {
          'js': ['static/main.js', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBjA3qcCd-vKs8LKnXEwoZrVLQQLgEeAIQ&callback=initMap']
        },
        'recents': recents
      })
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
    r.table('Log').get(req.params.id).run().then((log) => {
      res.render('')
    })
  })

  app.put('/l/:id', (req, res) => {
    let objectId = req.params.id
    const body = req.body

    if (util.isClean(body)) {
      Log.get(objectId).run().then((log) => {
        Log.merge(body).save().then((result) => {
          res.status(200).end()
        })
      })
    } else {
      res.status(400).json({ 'error': 'Missing or invalid params' })
    }
  })

  app.get('/search', (req, res) => {
    // return a series of results
  })
}
