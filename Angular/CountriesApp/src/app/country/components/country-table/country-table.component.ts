import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'country-table',
  imports: [DecimalPipe, LoaderComponent],
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryTableComponent {
  public readonly search = input.required<string>();
  public readonly isLoading = input.required<boolean>();
  public readonly countries = input.required<Country[] | undefined>();
  public readonly isEmpty = input.required<boolean>();

  private readonly listFormatter = new Intl.ListFormat('en-US', {
    style: 'long',
    type: 'conjunction',
  });

  format(list: string[]): string {
    return this.listFormatter.format(list);
  }

  generateGoogleMapsUrl({ lat, long }: Country): string {
    return `https://www.google.com/maps/@${lat},${long},6z`;
  }
}
