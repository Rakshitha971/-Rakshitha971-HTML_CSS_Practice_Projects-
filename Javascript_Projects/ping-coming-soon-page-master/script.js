const form = document.querySelector('form')
const input = document.querySelector('input[type="email"')
const formSubmit = document.querySelector('button')
const errorMsg = document.querySelector('.error-msg')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const emailValue = input.value.trim()
  const Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (emailValue === '') {
    errorMsg.innerText = '"Whoops! It looks like you forgot to add your email"'
     errorMsg.style.display = 'block'
    errorMsg.style.color = 'var(--Light-Red)'
  } else if (Regex.test(emailValue)) {
    errorMsg.innerText = 'Please provide a valid email address'
    errorMsg.style.display = 'block'
    errorMsg.style.color = 'var(--Light-Red)'
    input.style.borderColor = 'var(--Light-Red)'
  } else {
    errorMsg.innerHTML = ''
    console.log('Valid Email :', emailValue)
  }
})
