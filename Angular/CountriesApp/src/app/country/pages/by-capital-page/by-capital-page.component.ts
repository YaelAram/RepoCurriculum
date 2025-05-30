import { ChangeDetectionStrategy, Component, inject, input, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { Router } from '@angular/router';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'country-by-capital-page',
  imports: [SearchBarComponent, CountryTableComponent],
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css',
  host: { class: 'hscroll page' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByCapitalPageComponent {
  private readonly countryService = inject(CountryService);
  private readonly router = inject(Router);

  public readonly search = input<string>();
  public readonly capital = linkedSignal<string>(() => this.search() ?? '');

  public readonly countriesRs = rxResource({
    request: () => ({ capital: this.capital() }),
    loader: ({ request }) => {
      if (!request.capital) return of([]);
      return this.countryService.searchByCapital(request.capital);
    },
  });

  handleCapitalChange(capital: string) {
    this.capital.set(capital);
    this.router.navigate(['/by-capital'], { queryParams: { search: capital } });
  }
}
