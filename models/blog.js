'use strict'

const thinky = require(__dirname + 'database.js')
const type = thinky.type
// const r = thinky.r

let Blog = thinky.createModel('Blog', {
  'text': type.string(),
  'sites': [type.string().alphanum()]
})

exports.Blog = Blog
