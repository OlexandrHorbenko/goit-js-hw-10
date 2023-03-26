import Notiflix from 'notiflix';
export function handleCountryListItem(country) {
  return `
    <li class="country-item">
      <img src="${country.flags.svg}" alt="Flag" width="50" />
      <span class="country-name">${country.name.common}</span>
    </li>
  `;
}

export function handleCountryInfo(country) {
  const languages = Object.values(country.languages).join(', ');

  return `
    <div class="country-info__thumb country-item">
      <img src="${country.flags.svg}" alt="Flag" width="100" />
      <h2 class="country-name">${country.name.common}</h2>
    </div>
    <p class="country-info__label">Capital: <span class="country-info__text">${country.capital}</span></p>
    <p class="country-info__label">Population: <span class="country-info__text">${country.population.toLocaleString()}</span></p>
    <p class="country-info__label">Languages: <span class="country-info__text">${languages}</span></p>
  `;
}

export function handleOverflowMatches() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

export function handleSearchError() {
  Notiflix.Notify.failure('Error fetching data. Please try again later.');
}

export function handleNoCountryFound() {
  Notiflix.Notify.warning('Oops, there is no country with that name.');
}

export function handleRenderCountryList(countries, countryList) {
  countryList.innerHTML = '';
  countries.forEach(country => {
    const listItem = handleCountryListItem(country);
    countryList.insertAdjacentHTML('beforeend', listItem);
  });
}

export function handleRenderCountryInfo(country, countryInfo) {
  countryInfo.innerHTML = '';
  const countryData = handleCountryInfo(country);
  countryInfo.insertAdjacentHTML('beforeend', countryData);
}

export function clearSearchResults(countryList, countryInfo) {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

export function handleCountriesFetched(countries, countryList, countryInfo) {
  if (countries.length > 10) {
    handleOverflowMatches();
  } else if (countries.length > 1) {
    handleRenderCountryList(countries, countryList);
  } else if (countries.length === 1) {
    handleRenderCountryInfo(countries[0], countryInfo);
  } else {
    handleNoCountryFound();
  }
}

