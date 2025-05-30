export interface CountryAPI {
  name: Name;
  tld: string[];
  cca2: string;
  ccn3: string;
  independent: boolean;
  status: Status;
  unMember: boolean;
  currencies: { [key: string]: CurrencyApi };
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: Region;
  subregion: string;
  languages: { [key: string]: string };
  latlng: number[];
  landlocked: boolean;
  area: number;
  demonyms: { [key: string]: Demonyms };
  cca3: string;
  translations: { [key: string]: Translation };
  flag: string;
  maps: Maps;
  population: number;
  fifa?: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  postalCode: PostalCode;
  cioc?: string;
  borders?: string[];
  gini?: { [key: string]: number };
}

export interface CapitalInfo {
  latlng?: number[];
}

export interface Car {
  signs?: string[];
  side: Side;
}

export enum Side {
  Left = 'left',
  Right = 'right',
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export interface CurrencyApi {
  symbol: string;
  name: string;
}

export interface Demonyms {
  f: string;
  m: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: { [key: string]: Translation };
}

export interface Translation {
  official: string;
  common: string;
}

export interface PostalCode {
  format: null | string;
  regex: null | string;
}

export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}

export enum Status {
  OfficiallyAssigned = 'officially-assigned',
}
