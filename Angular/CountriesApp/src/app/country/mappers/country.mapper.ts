import { Country } from '../interfaces/country';
import { CountryAPI } from '../interfaces/country-api';

export const toCountryArray = (resp: CountryAPI[]): Country[] => {
  return resp.map((country) => ({
    name: country.name.common,
    capitals: country.capital,
    flag: country.flags.svg,
    region: country.region,
    population: country.population,
    languages: Object.values(country.languages),
    currencies: Object.values(country.currencies),
    cca3: country.cca3,
    lat: country.latlng[0],
    long: country.latlng[1],
  }));
};
