export interface Country {
  flag: string;
  name: string;
  capitals: string[];
  region: string;
  currencies: Currency[];
  languages: string[];
  population: number;
  cca3: string;
  lat: number;
  long: number;
}

export interface Currency {
  name: string;
  symbol: string;
}

export type Region = 'africa' | 'americas' | 'asia' | 'europe' | 'oceania';
