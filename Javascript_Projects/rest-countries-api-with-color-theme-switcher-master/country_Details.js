const country_Name = new URLSearchParams(window.location.search).get('name')

const countryData = fetch(
  `https://restcountries.com/v3.1/name/${country_Name}?fullText=true`
)
  .then((Res) => Res.json())
  .then((data) => {
    console.log(data)

    data.forEach((countryData) => {
      console.log(countryData)
      const countryName = document.querySelector('.country-name')
      countryName.textContent = countryData.name.common

      const countryDetailsImg = document.querySelector('.country-image img')
      const countryNativeName = document.querySelector('.native-name span')

      const countryPopulation = document.querySelector('.population span')
      const countryRegion = document.querySelector('.region span')
      const countrySubRegion = document.querySelector('.sub-region span')
      const countryCapital = document.querySelector('.capital span')
      const countryCurrencies = document.querySelector('.currencies span')
      const countryLanguages = document.querySelector('.languages span')
      const countryTLD = document.querySelector('.top-level-domain span')
      const borderCountriesContainer =
        document.querySelector('.border-countries')

      countryDetailsImg.src = countryData.flags.svg
      const nativeNames = countryData.name.nativeName
      const firstNativeKey = Object.keys(countryData.name.nativeName)
      countryNativeName.textContent = nativeNames[firstNativeKey[0]].official
      countryPopulation.textContent = countryData.population.toLocaleString()
      countryRegion.textContent = countryData.region
      countrySubRegion.textContent = countryData.subregion
      countryCapital.textContent = countryData.capital

      const tld = Object.values(countryData.tld)
      countryTLD.textContent = tld.join(',')

      const currencyName = Object.keys(countryData.currencies)
      console.log(currencyName)
      countryCurrencies.textContent = countryData.currencies[currencyName].name

      const languagesNames = Object.values(countryData.languages)
      countryLanguages.textContent = languagesNames.join(',')

      if (countryData.borders) {
        countryData.borders.forEach((border) => {
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => {
              const borderCountryTag = document.createElement('a')
              borderCountryTag.innerText = borderCountry.name.common
              borderCountryTag.href = `country_Details.html?name=${borderCountry.name.common}`
              borderCountriesContainer.append(borderCountryTag)
            })
        })
      }
    })
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
