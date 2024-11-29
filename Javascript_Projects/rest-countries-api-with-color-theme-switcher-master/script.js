// fetch countries data from API

let allCountries = []

async function fetchCountries() {
  try {
    const response = await fetch('/data.json')
    console.log(response)

    allCountries = await response.json()
    displayCountries(allCountries)
  } catch (error) {
    console.log('Error fetching countries :', error)
  }
}

// display countries in the DOM

function displayCountries(countries) {
  const container = document.querySelector('#countries-container')
  container.innerHTML = ''

  countries.forEach((country) => {
    const countryElement = createCountryElement(country)
    container.appendChild(countryElement)
  })
}

//create countryElement

function createCountryElement(country) {
  const countryDiv = document.createElement('div')
  countryDiv.className = 'countries-flex-item'

  countryDiv.innerHTML = `
    <img src="${country.flags.png}" alt="${country.name.common} flag">
    <div class="country-description">
    <a href="country_Details.html?name=${encodeURIComponent(
      country.name.common
    )}">
        <h3 class="country-name">${country.name.common}</h3>
         <p class="population">Population: <span>${country.population.toLocaleString()}</span></p>
    <p class="region">Region: <span>${country.region}</span></p>
    <p class="capital">Capital: <span>${
      country.capital?.[0] || 'N/A'
    }</span></p>
    </a>
   
    </div>
  `

  return countryDiv
}

//Search Countries
const searchInput = document.querySelector('.countries_search')

searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLocaleLowerCase().trim()
  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLocaleLowerCase().includes(searchValue)
  )
  console.log(filteredCountries)
  displayCountries(filteredCountries)
})

fetchCountries()

const FilterValue = document.querySelector('.county-regions')

FilterValue.addEventListener('change', (e) => {
  console.log(e.target.value)
  const filteredRegions = allCountries.filter((country) => {
    return country.region.includes(e.target.value)
  })
  console.log(filteredRegions)
  displayCountries(filteredRegions)
})

const lightDarkMode = document.querySelector('.light_dark_mode')
const themeChanger = document.querySelector('h5 .dark-theme')
const themeIcon = document.querySelector('#theme-icon')
isDarkMode = false

lightDarkMode.addEventListener('click', (e) => {
  isDarkMode = !isDarkMode
  document.body.classList.toggle('dark-mode')
  if (isDarkMode) {
    themeChanger.innerText = 'Light Mode'
    themeIcon.classList.remove('fa-moon')
    themeIcon.classList.add('fa-sun')
  } else {
    themeChanger.innerText = 'Dark Mode'
    themeIcon.classList.remove('fa-sun')
    themeIcon.classList.add('fa-moon')
  }
})
