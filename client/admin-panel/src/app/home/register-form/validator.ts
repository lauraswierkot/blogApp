import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function ageValidation(): ValidatorFn {
  const yearGap: number = 18;
  return (control: AbstractControl): ValidationErrors | null => {
    const dateFromControl: Date = new Date(control?.value);
    const dateToday: Date = new Date();
    const dateEighteenYearsAgo: Date = new Date(
      dateToday.setFullYear(dateToday.getFullYear() - yearGap)
    );
    return dateEighteenYearsAgo < dateFromControl ? { adolescent: true } : null;
  };
}

export function confirmPasswordValidation(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    return !!matchingControl &&
      !!control &&
      control.value !== matchingControl.value
      ? { mismatch: true }
      : null;
  };
}
