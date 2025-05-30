import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { Country, Region } from '../interfaces/country';
import { CountryAPI } from '../interfaces/country-api';
import { toCountryArray } from '../mappers/country.mapper';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://restcountries.com/v3.1';
  private readonly cache = new Map<string, Country[]>();

  searchByName(name: string): Observable<Country[]> {
    return this.searchByCapitalOrName('name', name);
  }

  searchByCapital(capital: string): Observable<Country[]> {
    return this.searchByCapitalOrName('capital', capital);
  }

  private searchByCapitalOrName(type: 'capital' | 'name', search: string): Observable<Country[]> {
    const countries = this.cache.get(`${type} ${search}`);
    if (countries) return of(countries);

    return this.http.get<CountryAPI[]>(`${this.baseUrl}/${type}/${search}`).pipe(
      map((resp) => toCountryArray(resp)),
      map((countries) => countries.sort((c1, c2) => c1.name.localeCompare(c2.name))),
      tap((countries) => this.cache.set(`${type} ${search}`, countries)),
      catchError(() => of([])),
    );
  }

  searchByRegion(region: Region) {
    const countries = this.cache.get(region);
    if (countries) return of(countries);

    return this.http.get<CountryAPI[]>(`${this.baseUrl}/region/${region}`).pipe(
      map((resp) => toCountryArray(resp)),
      map((countries) => countries.sort((c1, c2) => c1.name.localeCompare(c2.name))),
      tap((countries) => this.cache.set(region, countries)),
      catchError((error: any) => {
        console.error(error.message);
        return of([]);
      }),
    );
  }
}
