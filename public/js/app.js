console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const placeNameEl = document.querySelector('#place_name')
const summaryEl = document.querySelector('#current_summary')
const temperatureEl = document.querySelector('#temperature')

placeNameEl.textContent = ''

weatherForm.addEventListener('submit', (event) => {
  // prevent form to reload page
  event.preventDefault()
  const location = search.value

  placeNameEl.textContent = 'Loading...'
  summaryEl.textContent = ''
  temperatureEl.textContent = ''

  fetch('/weather?address=' + encodeURI(location))
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error
          return
        }
        placeNameEl.textContent = data.location
        summaryEl.textContent = data.forecast.summary
        temperatureEl.textContent = data.forecast.temperature
    })
  })
})
