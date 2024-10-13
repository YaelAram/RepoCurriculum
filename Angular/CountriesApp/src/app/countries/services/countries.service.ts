import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

import { Country } from '../interfaces/country';
import { CountriesEndpoint } from '../interfaces/countriesApi';
import { CacheStore, Region } from '../interfaces/cacheStore';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private baseUrl: string = 'https://restcountries.com/v3.1';
  private localStorageKey: string = 'angular-countries-app';
  public cache: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: undefined, countries: [] },
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cache));
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(this.localStorageKey);

    if (data) this.cache = JSON.parse(data);
  }

  search(endpoint: CountriesEndpoint, term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}${endpoint}${term}`).pipe(
      catchError(() => of([])),
      tap((countries) => {
        if (CountriesEndpoint.SEARCH_BY_CAPITAL === endpoint)
          this.cache.byCapital = { term, countries };
        else if (CountriesEndpoint.SEARCH_BY_COUNTRY === endpoint)
          this.cache.byCountry = { term, countries };
        else this.cache.byRegion = { region: term as Region, countries };
      }),
      tap(() => this.saveToLocalStorage())
    );
  }
}
