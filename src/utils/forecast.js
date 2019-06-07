const request = require('request')


const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/f77a09776f36b4ff3ee9720c7b314201/'
  + latitude
  + ','
  + longitude
  + '?units=si&lang=ru'

  request(
    {url, json: true},
    (error, {statusCode, body}) => {
      if (error) {
        callback('Unable to connect to weather service!', {})
        return
      }
      if (statusCode !== 200) {
        callback('Unable to find location!', {})
        return
      }
      callback(
        undefined,
        {
          temperature: body.currently.temperature,
          summary: body.daily.data[0].summary,
          summary2: body.daily.data[1].summary,
          precipProbability: body.currently.precipProbability
        }
      )
    }
  )
}

module.exports = forecast
