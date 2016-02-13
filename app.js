'use strict'

// if modules need to be installed, override the default error message
// with a more understandable one
process.on('uncaughtException', (e) => {
  if (e.code === 'MODULE_NOT_FOUND') {
    /* eslint-disable no-console */
    console.log('Module(s) not found. Please run \'npm install\' before trying again.')
    /* eslint-enable no-console */
    process.exit()
  }
})

const express = require('express')
const nunjucks = require('nunjucks')

const config = require('./config.js')

const app = express()

app.set('port', process.env.PORT || config.server.port || 3000)

app.locals({ 'app': config.app })

const logger = require('./logger.js')
app.use(require('morgan')('dev', { 'stream': logger.stream }))

nunjucks.configure('views', {
  'autoescape': true,
  'express': app,
  'watch': config.server.development // reload templates when in development
})

require('./routes.js')(app)

const server = app.listen(app.get('port'), () => {
  logger.info(`Server listening on port ${server.address().port}`)
})
