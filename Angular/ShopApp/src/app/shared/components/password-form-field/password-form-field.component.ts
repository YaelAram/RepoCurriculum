import { Component, inject, input, signal } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FormErrorMessageService } from '@shared/services/form-error-message.service';

@Component({
  selector: 'shared-password-form-field',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './password-form-field.component.html',
  styleUrl: './password-form-field.component.css',
})
export class PasswordFormFieldComponent {
  private readonly formErrorMessage = inject(FormErrorMessageService);

  readonly control = input.required<FormControl>();
  readonly placeholder = input.required<string>();
  readonly label = input.required<string>();

  readonly isPasswordVisible = signal<boolean>(false);

  togglePasswordVisibility() {
    this.isPasswordVisible.update((prev) => !prev);
  }

  getErrorMessage(control: AbstractControl): string {
    return this.formErrorMessage.getErrorMessage(control);
  }
}
