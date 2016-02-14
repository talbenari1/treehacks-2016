'use strict'

const thinky = require('../database.js')
const type = thinky.type
const r = thinky.r
const Blog = require('./blog.js')

let City = thinky.createModel('City', {
  'name': type.string().alphanum(),
  'arrive': type.date().default(r.now()),
  'depart': type.date().default(r.now())
})

City.hasAndBelongsToMany(Blog, 'blog_posts', 'id', 'id')

module.exports = City
