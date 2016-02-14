'use strict'

exports.server = {
  'port': process.env.PORT || 3000,
  'development': process.env.NODE_ENV !== 'production'
}

exports.app = {
  'name': 'glogger'
}
