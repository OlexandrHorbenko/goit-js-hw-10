const BASE_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}${searchQuery}`).then(response => {
    if (!response.ok) {
      if (response.status === 404) {
        return Promise.reject('Oops, there is no country with that name');
      }
      console.error('Error fetching data');
      return null;
    }
    return response.json();
  });
}