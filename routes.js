'use strict'

const express = require('express')
const path = require('path')
const util = require('./utils.js')

const thinky = require('./database.js')
const r = thinky.r
const Log = require('./models/log.js')

module.exports = (app) => {
  app.use('/static', express.static(path.join(__dirname, 'public')))

  app.get('/', (req, res) => {
    r.table('Log').orderBy({ 'index': 'log_create_date' }).limit(10).run().then((recents) => {
      res.render('home.html', {
        'name': 'Home',
        'page': {
          'js': [
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js',
            '/static/home.js',
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyBjA3qcCd-vKs8LKnXEwoZrVLQQLgEeAIQ&signed_in=true&libraries=places'
          ]
        },
        'recents': JSON.stringify(recents)
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
      res.send(hashLink)
    })
  })

  app.get('/l/:id', (req, res) => {
    r.table('Log').get(req.params.id).run().then((log) => {
      res.render('log.html', {
        'name': 'Logs',
        'page': {
          'js': ['/static/log.js', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBjA3qcCd-vKs8LKnXEwoZrVLQQLgEeAIQ&callback=initMap']
        }
      })
    })
  })

  app.put('/l/:id', (req, res) => {
    let objectId = req.params.id
    const body = req.body

    if (util.isClean(body)) {
      Log.get(objectId).run().then((log) => {
        log.merge(body).save().then((result) => {
          res.status(200).end()
        })
      })
    } else {
      res.status(400).json({ 'error': 'Missing or invalid params' })
    }
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
    })).limit(10).run().then(values => {
      res.send(values)
    }).error(err => {
      console.log(err)
    })
  })
}
