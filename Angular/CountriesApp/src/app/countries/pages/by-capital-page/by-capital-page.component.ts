import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

import { Country } from '../../interfaces/country';
import { CountriesEndpoint } from '../../interfaces/countriesApi';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css',
})
export class ByCapitalPageComponent implements OnInit {
  public capitalSearch: string = '';
  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}

  searchByCapital(capital: string): void {
    this.capitalSearch = capital;
    this.isLoading = true;

    this.countriesService
      .search(CountriesEndpoint.SEARCH_BY_CAPITAL, capital)
      .subscribe((countries) => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.capitalSearch = this.countriesService.cache.byCapital.term;
    this.countries = this.countriesService.cache.byCapital.countries;
  }
}
