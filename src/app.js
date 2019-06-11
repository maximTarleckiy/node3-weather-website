const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup handlebar template engine and public path
// https://expressjs.com/en/4x/api.html#app.set
app.set('view engine', 'hbs')
app.use(express.static(publicDirPath))

hbs.registerPartials(partialsPath)

app.set('views', viewsPath)
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Maxim Tarlecky'
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Maxim Tarlecky'
  })
})
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'bla-bla',
    name: 'Maxim Tarlecky'
  })
})
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide address param'
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
         return res.send({
            error: error
         })
      }
      return res.send({
        forecast: forecastData,
        location: place_name,
        address: req.query.address
      })
    })
  })
})
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide search param'
    })
  }
  res.send({
    products: []
  })
})
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found!',
    name: 'Maxim Tarlecky'
  })
})
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found!',
    name: 'Maxim Tarlecky'
  })
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
  console.log('Server is up on port ' + port + '.')
})
