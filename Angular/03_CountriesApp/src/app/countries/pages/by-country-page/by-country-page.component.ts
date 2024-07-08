import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { CountriesEndpoint } from '../../interfaces/countriesApi';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css',
})
export class ByCountryPageComponent implements OnInit {
  public countrySearch: string = '';
  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}

  searchByCountry(country: string): void {
    this.countrySearch = country;
    this.isLoading = true;

    this.countriesService
      .search(CountriesEndpoint.SEARCH_BY_COUNTRY, country)
      .subscribe((countries) => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.countrySearch = this.countriesService.cache.byCountry.term;
    this.countries = this.countriesService.cache.byCountry.countries;
  }
}
