import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, input, linkedSignal } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormErrorMessageService } from '@shared/services/form-error-message.service';

@Component({
  selector: 'shared-input-chip',
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './form-input-chip.component.html',
  styleUrl: './form-input-chip.component.css',
})
export class FormInputChipComponent {
  private readonly formErrorMessage = inject(FormErrorMessageService);
  private readonly announcer = inject(LiveAnnouncer);

  readonly label = input.required<string>();
  readonly placeholder = input.required<string>();
  readonly control = input.required<FormControl<string[]>>();

  readonly reactiveKeywords = linkedSignal<string[]>(() => this.control().value);

  removeReactiveKeyword(keyword: string) {
    this.reactiveKeywords.update((keywords) => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from reactive form`);
      return [...keywords];
    });
  }

  addReactiveKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.reactiveKeywords.update((keywords) => [...keywords, value]);
      this.announcer.announce(`added ${value} to reactive form`);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  getErrorMessage(control: AbstractControl): string {
    return this.formErrorMessage.getErrorMessage(control);
  }
}
