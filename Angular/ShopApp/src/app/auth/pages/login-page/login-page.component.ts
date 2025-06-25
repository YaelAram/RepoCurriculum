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

@Component({
  selector: 'auth-login-page',
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink,
    FormInputComponent,
    PasswordFormFieldComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export default class LoginPageComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly snackBarService = inject(MatSnackBar);

  private readonly authService = inject(AuthService);
  private readonly formErrorMessage = inject(FormErrorMessageService);

  readonly logInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  handleSubmit() {
    if (this.logInForm.invalid) {
      this.logInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.logInForm.value;
    if (!email || !password) return;

    this.authService.logIn(email, password).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }

      this.snackBarService.open('Sorry, wrong combination of email and password', 'Dismiss', {
        duration: 3_000,
      });
    });
  }

  getErrorMessage(control: AbstractControl): string {
    return this.formErrorMessage.getErrorMessage(control);
  }
}
