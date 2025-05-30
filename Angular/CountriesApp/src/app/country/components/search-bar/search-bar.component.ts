import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'country-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  host: { class: 'search-bar' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit {
  public readonly placeholder = input.required<string>();
  public readonly initialValue = input.required<string>();
  public readonly onSearch = output<string>();

  public readonly isError = signal<boolean>(false);
  public readonly searchInput = new FormControl<string>('', {
    nonNullable: true,
  });

  updateInitialValue = effect(() => {
    this.searchInput.setValue(this.initialValue(), { emitEvent: false });
  });

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(350), takeUntilDestroyed())
      .subscribe((value) => this.emitSearch(value));
  }

  private emitSearch(value: string) {
    const searchTerm = value.toLowerCase().trim();
    if (!searchTerm || !searchTerm.length) {
      return this.isError.set(true);
    }

    this.isError.set(false);
    this.onSearch.emit(searchTerm);
  }
}
