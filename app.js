'use strict'

const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')

const config = require('./config.js')
const app = express()

app.set('port', config.server.port)

app.locals = { 'app': config.app }

const logger = require('./logger.js')
app.use(require('morgan')('dev', { 'stream': logger.stream }))
app.use(bodyParser.json())

nunjucks.configure('views', {
  'autoescape': true,
  'express': app,
  'tags': {
    blockStart: '<%',
    blockEnd: '%>',
    variableStart: '<$',
    variableEnd: '$>',
    commentStart: '<#',
    commentEnd: '#>'
  },
  'watch': config.server.development // reload templates when in development
})

require('./routes.js')(app)

const server = app.listen(app.get('port'), () => {
  logger.info(`Server listening on port ${server.address().port}`)
})
