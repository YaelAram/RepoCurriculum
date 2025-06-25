import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const fieldsSameValue = (name1: string, name2: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const field1 = control.get(name1)?.value;
    const field2 = control.get(name2)?.value;

    if (field1 === undefined) throw new Error(`Field named ${name1} not found`);
    if (field2 === undefined) throw new Error(`Field named ${name2} not found`);

    return field1 === field2 ? null : { custom: { message: `Fields ${name1} and ${name2} are not equal` } };
  };
};
