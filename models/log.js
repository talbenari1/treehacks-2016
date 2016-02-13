'use strict'

const thinky = require(__dirname + 'database.js')
const type = thinky.type
const r = thinky.r
const City = require('./city.js')

let Log = thinky.createModel('Log', {
  'title': type.string().max(70).alphanum(),
  'author': type.string().max(35).regex(/\w+/),
  'log_create_date': type.date().default(r.now())
})

Log.hasAndBelongsToMany(City, 'cities', 'id', 'id')

exports.Log = Log
