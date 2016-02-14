'use strict'

const thinky = require('../database.js')
const type = thinky.type
const r = thinky.r

let Log = thinky.createModel('Log', {
  'id': type.string(),
  'title': type.string().max(70).regex(/\w+/),
  'author': type.string().max(35).regex(/\w+/),
  'log_create_date': type.date().default(r.now()),
  'cities': [{
    'name': type.string(),
    'arrive': type.date().default(r.now()),
    'depart': type.date().default(r.now()),
    'blog_post': {
      'text': type.string()
    },
    'lat': type.number(),
    'lon': type.number()
  }]
})

Log.ensureIndex('log_create_date')

module.exports = Log
