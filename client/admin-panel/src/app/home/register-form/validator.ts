import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
