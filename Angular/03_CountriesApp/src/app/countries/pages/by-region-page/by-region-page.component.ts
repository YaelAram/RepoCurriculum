import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';

import { CountriesService } from '../../services/countries.service';
import { CountriesEndpoint } from '../../interfaces/countriesApi';
import { Region } from '../../interfaces/cacheStore';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css',
})
export class ByRegionPageComponent implements OnInit {
  public regionSearch?: Region;
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  constructor(private countriesService: CountriesService) {}

  searchByRegion(region: Region): void {
    this.regionSearch = region;
    this.isLoading = true;

    this.countriesService
      .search(CountriesEndpoint.SEARCH_BY_REGION, region)
      .subscribe((countries) => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.regionSearch = this.countriesService.cache.byRegion.region;
    this.countries = this.countriesService.cache.byRegion.countries;
  }
}
