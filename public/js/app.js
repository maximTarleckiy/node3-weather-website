console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (event) => {
  // prevent form to reload page
  event.preventDefault()
  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch('/weather?address=' + encodeURI(location))
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error
          return
        }
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast.summary
    })
  })
})
