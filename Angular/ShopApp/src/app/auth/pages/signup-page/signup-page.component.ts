import { Component, inject } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '@auth/services/auth.service';

import { FormInputComponent } from '@shared/components/form-input/form-input.component';
import { PasswordFormFieldComponent } from '@shared/components/password-form-field/password-form-field.component';
import { FormErrorMessageService } from '@shared/services/form-error-message.service';
import { fieldsSameValue } from '@shared/validators/fieldsSameValue';

@Component({
  selector: 'auth-signup-page',
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink,
    FormInputComponent,
    PasswordFormFieldComponent,
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
})
export default class SignupPageComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly snackBarService = inject(MatSnackBar);

  private readonly authService = inject(AuthService);
  private readonly formErrorMessage = inject(FormErrorMessageService);

  readonly signUpForm = this.formBuilder.group(
    {
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validators: [fieldsSameValue('password', 'confirmPassword')] },
  );

  handleSubmit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { fullName, email, password } = this.signUpForm.value;
    if (!fullName || !email || !password) return;

    this.authService.signUp({ fullName, email, password }).subscribe((wasCreated) => {
      if (wasCreated) {
        this.router.navigateByUrl('/');
        return;
      }

      this.snackBarService.open(`Sorry, email ${email} is already registered`, 'Dismiss', {
        duration: 3_000,
      });
    });
  }

  getErrorMessage(control: AbstractControl): string {
    return this.formErrorMessage.getErrorMessage(control);
  }
}
