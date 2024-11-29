const faqItems = document.querySelectorAll('.faq-items')

faqItems.forEach((item) => {
  const question = item.querySelector('.faq-question')
  const answer = item.querySelector('.answer')
  const plusIcon = item.querySelector('.plus-icon')
  const minusIcon = item.querySelector('.minus-icon')

  const toggleFAQ = () => {
    const expanded = question.getAttribute('aria-expanded') === 'true'
    question.setAttribute('aria-expanded', !expanded)
    answer.setAttribute('aria-expanded', expanded)
    plusIcon.classList.toggle('Inactive')
    minusIcon.classList.toggle('Active')
    answer.classList.toggle('Active')
  }

  question.addEventListener('click', toggleFAQ)

  question.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleFAQ()
    }
  })
})
