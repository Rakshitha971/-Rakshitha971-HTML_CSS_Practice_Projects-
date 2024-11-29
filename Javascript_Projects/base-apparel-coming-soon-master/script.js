const form = document.querySelector('form')
const submitForm = document.querySelector('button')
const input = document.querySelector('input')
const errorMsg = document.querySelector('.error-message')
const errorIcon = document.querySelector('.error-icon')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const emailValue = input.value.trim()

  const emailRegex = /@/

  if (emailValue === '') {
    errorMsg.textContent = 'Please enter an email'
    errorIcon.classList.remove('hidden')
  } else if (!emailRegex.test(emailValue)) {
    errorMsg.textContent = 'Please provide a valid email address'
    errorIcon.classList.remove('hidden')
  } else {
    errorMsg.textContent = 'Successfully updated'
    errorIcon.classList.add('hidden')
  }
})
