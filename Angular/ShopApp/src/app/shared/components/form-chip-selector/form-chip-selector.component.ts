import { Component, inject, input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { FormErrorMessageService } from '@shared/services/form-error-message.service';

@Component({
  selector: 'shared-form-chip-selector',
  imports: [MatChipsModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './form-chip-selector.component.html',
  styleUrl: './form-chip-selector.component.css',
})
export class FormChipSelectorComponent {
  private readonly formErrorMessage = inject(FormErrorMessageService);

  readonly label = input.required<string>();
  readonly options = input.required<string[]>();
  readonly control = input.required<FormControl>();

  getErrorMessage(control: AbstractControl): string {
    return this.formErrorMessage.getErrorMessage(control);
  }
}
