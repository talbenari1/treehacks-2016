'use strict'

const thinky = require('../database.js')
const type = thinky.type
// const r = thinky.r

let Blog = thinky.createModel('Blog', {
  'text': type.string(),
  'sites': [type.string().alphanum()]
})

module.exports = Blog
