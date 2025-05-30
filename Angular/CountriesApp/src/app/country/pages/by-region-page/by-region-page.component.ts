import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { Region } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'country-by-region-page',
  imports: [CountryTableComponent],
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css',
  host: { class: 'hscroll page' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByRegionPageComponent {
  private readonly countryService = inject(CountryService);

  public readonly region = signal<Region>('africa');
  public readonly countriesRs = rxResource({
    request: () => ({ region: this.region() }),
    loader: ({ request }) => this.countryService.searchByRegion(request.region),
  });

  handleRegionChange(region: string) {
    this.region.set(region as Region);
  }
}
