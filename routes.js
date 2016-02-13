'use strict'

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index.html')
  })

  app.get('/l/:id', (req, res) => {
    // return the trip
  })

  app.post('/l/:id', (req, res) => {
    // create a new trip
  })

  app.get('/search', (req, res) => {
    // return a series of results
  })
}
