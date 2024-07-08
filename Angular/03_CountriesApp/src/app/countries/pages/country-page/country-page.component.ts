import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { CountriesEndpoint } from '../../interfaces/countriesApi';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css',
})
export class CountryPageComponent implements OnInit {
  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) =>
          this.countriesService.search(
            CountriesEndpoint.SEARCH_BY_ALPHA_CODE,
            id
          )
        ),
        map((countries) => (countries.length > 0 ? countries.at(0)! : null))
      )
      .subscribe((country) => {
        if (!country) return this.router.navigateByUrl('/countries/by-capital');
        return (this.country = country);
      });
  }
}
