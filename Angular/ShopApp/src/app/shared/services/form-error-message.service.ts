import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormErrorMessageService {
  getErrorMessage(control: AbstractControl): string {
    const errors = control.errors;
    if (!control.touched || !errors) return '';

    const key = Object.keys(errors).at(0);
    if (!key) return '';

    const error = errors[key];

    switch (key) {
      case 'required':
        return 'This field is required';
      case 'minlength':
        return `Min length required: ${error.requiredLength}. Current: ${error.actualLength}`;
      case 'maxlength':
        return `Max length allowed: ${error.requiredLength}. Current: ${error.actualLength}`;
      case 'min':
        return `Min value allowed: ${error.min}. Current: ${error.actual}`;
      case 'email':
        return 'The provided value is not a valid email';
      case 'custom':
        return error.message;
      default:
        return 'Unknown error';
    }
  }
}
