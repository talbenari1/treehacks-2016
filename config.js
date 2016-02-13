'use strict'

exports.server = {
  'port': 3000,
  'development': process.env.NODE_ENV !== 'production'
}

exports.app = {
  'name': 'glogger'
}
