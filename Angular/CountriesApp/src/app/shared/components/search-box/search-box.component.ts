import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  onKeyPress(term: string) {
    this.debouncer.next(term);
  }

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(350))
      .subscribe((term) => this.onValue.emit(term));
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }
}
