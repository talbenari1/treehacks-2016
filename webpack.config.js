'use strict'

const fs = require('fs')
const path = require('path')
const config = {
  context: path.join(__dirname, '/client/js'),
  entry: {},
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel?cacheDirectory'
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }]
  }
}

// All folders under ./client/js become entry points
fs.readdirSync(config.context).forEach((folder) => {
  if (fs.statSync(path.join(config.context, folder)).isDirectory()) {
    config.entry[folder] = './' + folder
  }
})

module.exports = config
