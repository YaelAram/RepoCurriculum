import { Country } from './country';

export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

export interface CacheStore {
  byCapital: TermCountries;
  byCountry: TermCountries;
  byRegion: RegionContries;
}

export interface TermCountries {
  term: string;
  countries: Country[];
}

export interface RegionContries {
  region?: Region;
  countries: Country[];
}
