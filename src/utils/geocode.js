const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
  + encodeURIComponent(address)
  + '.json'
  + '?access_token=pk.eyJ1IjoiYmJzLW1heCIsImEiOiJjanV2Y28waXowMGJqM3luemlqd3Y5N2V0In0.3UGgFfBGdclh9iY8PuuD_g'
  + '&limit=1'

  request({ url, json: true}, (error, {statusCode, body}) => {
        if (error) {
          callback('Unable to connect to location service!')
          return
        }
        if (statusCode !== 200 || body.features.length === 0) {
          callback('Unable to find geocode!')
          return
        }
        callback(
          undefined,
          {
            place_name: body.features[0].place_name,
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0]
          }
        )
  })
}

module.exports = geocode
