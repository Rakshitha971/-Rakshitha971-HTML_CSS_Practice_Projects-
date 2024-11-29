const firstName = document.querySelector('#fname')
const lastName = document.querySelector('#lname')
const Email = document.querySelector('#email')
const password = document.querySelector('#password')
const errorMsg = document.querySelectorAll('.error-msg')
const errorIcon = document.querySelectorAll('.error-icon')
const submitBtn = document.querySelector('button')

submitBtn.addEventListener('click', (event) => {
  event.preventDefault()
  const Regex = /^[A-Za-z0-9_.]+@+[A-za-z0-9].[A-za-z0-9]/
  if (firstName.value === '') {
    errorMsg[0].classList.add('hidden')
    errorIcon[0].classList.add('hidden')
    firstName.style.outline = '1px solid Red'
    firstName.placeholder = ''
  }

  if (lastName.value === '') {
    errorMsg[1].classList.add('hidden')
    errorIcon[1].classList.add('hidden')
    lastName.style.outline = '1px solid Red'
    lastName.placeholder = ''
  }

  if (Email.value === '') {
    errorMsg[2].classList.add('hidden')
    errorIcon[2].classList.add('hidden')
    Email.style.outline = '1px solid Red'
    Email.placeholder = ''
  } else if (!Regex.test(Email.value)) {
    errorMsg[2].classList.add('hidden')
    errorIcon[2].classList.add('hidden')
    Email.style.outline = '1px solid Red'
    errorMsg[2].innerText = 'Looks like this is not an email'
  }

  if (password.value === '') {
    errorMsg[3].classList.add('hidden')
    errorIcon[3].classList.add('hidden')
    password.style.outline = '1px solid Red'
    password.placeholder = ''
  }

  if (!firstName.value === '' && !lastName.value === '' && )
})
