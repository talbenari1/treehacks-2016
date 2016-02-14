'use strict'

const express = require('express')
const nunjucks = require('nunjucks')

const config = require('./config.js')
const app = express()

app.set('port', process.env.PORT || config.server.port || 3000)

app.locals = { 'app': config.app }

const logger = require('./logger.js')
app.use(require('morgan')('dev', { 'stream': logger.stream }))

nunjucks.configure('client/views', {
  'autoescape': true,
  'express': app,
  'watch': config.server.development // reload templates when in development
})

require('./routes.js')(app)

const server = app.listen(app.get('port'), () => {
  logger.info(`Server listening on port ${server.address().port}`)
})
