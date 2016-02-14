// The server logging utility

'use strict'

const winston = require('winston')

const logger = new (winston.Logger)({
  'level': 'info',
  'transports': [
    new (winston.transports.Console)({
      'name': 'debug/info',
      'level': 'debug',
      'handleExceptions': false,
      'json': false,
      'colorize': true
    })
  ]
})

logger.stream = {
  write: (message) => { logger.info(message) }
}

module.exports = logger
