import { ChangeDetectionStrategy, Component, inject, input, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { Router } from '@angular/router';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'country-by-country-page',
  imports: [SearchBarComponent, CountryTableComponent],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css',
  host: { class: 'hscroll page' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByCountryPageComponent {
  private readonly countryService = inject(CountryService);
  private readonly router = inject(Router);

  public readonly search = input<string>();
  public readonly country = linkedSignal<string>(() => this.search() ?? '');

  public readonly countriesRs = rxResource({
    request: () => ({ name: this.country() }),
    loader: ({ request }) => {
      if (!request.name) return of([]);
      return this.countryService.searchByName(request.name);
    },
  });

  handleCountryChange(country: string) {
    this.country.set(country);
    this.router.navigate(['/by-country'], { queryParams: { search: country } });
  }
}
