import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { UserFacade, UserRegister } from '@state/index';
import { Role } from '@state/user/user.model';
import { ageValidation, confirmPasswordValidation } from './validator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  public selectedValue: string;
  public options: Role[] = [Role.User, Role.Admin];
  public registerForm: FormGroup;

  constructor(private facade: UserFacade, private router: Router) {
    this.registerForm = new FormGroup({
      username: new FormControl('', { validators: Validators.required }),
      email: new FormControl('', { validators: Validators.email }),
      password: new FormControl('', { validators: Validators.required }),
      confirmPassword: new FormControl('', { validators: Validators.required }),
      role: new FormControl(this.options[0], { validators: Validators.required }),
      age: new FormControl('', ageValidation())
    }),
      { validator: confirmPasswordValidation('password', 'confirmPassword') };
  }

  public get username(): AbstractControl {
    return this.registerForm.get('username');
  }

  public get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  public get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  public get confirmPassword(): AbstractControl {
    return this.registerForm.get('confirmPassword');
  }

  public get role(): AbstractControl {
    return this.registerForm.get('role');
  }

  public get age(): AbstractControl {
    return this.registerForm.get('age');
  }

  public register(): void {
    const register: UserRegister = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: this.registerForm.value.role,
      age: new Date(this.registerForm.value.age).toISOString(),
    };
    this.facade.register(register);
  }

  public toLoginForm(): void {
    this.router.navigate(['/login']);
  }
}
