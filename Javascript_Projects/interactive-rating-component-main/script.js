const radios = document.querySelectorAll('input[name="number"]')
const form = document.querySelector('form')
const ratingContainer = document.querySelector('#rating-container')
const thanksBox = document.querySelector('#thanks-box')
const rateNumber = document.querySelector('#rate-number')

radios.forEach((radio) => {
  const label = radio.nextElementSibling

  label.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      radio.checked = true
      label.click()
    }

    // if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    //   event.preventDefault()
    //   const nextRadio = radio[index + 1] || radio[0]
    //   nextRadio.focus()
    // }

    // if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    //   event.preventDefault()
    //   const prevRadio = radio[index - 1] || radio[radio.length - 1]
    //   prevRadio.focus()
    // }
  })
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  let selectedRating

  radios.forEach((radio) => {
    if (radio.checked) {
      selectedRating = radio.value
    }
  })

  if (selectedRating) {
    rateNumber.textContent = selectedRating
    thanksBox.style.display = 'block'
    ratingContainer.style.display = 'none'
  }
})
