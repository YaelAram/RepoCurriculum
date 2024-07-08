import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-table',
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.css',
})
export class CountryTableComponent {
  @Input()
  public term: string = '';

  @Input()
  public countries: Country[] = [];

  getId(index: number, country: Country) {
    return country.ccn3;
  }
}
