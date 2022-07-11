import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { UserFacade } from 'src/app/state/user/user.facade';
import { UserLogin, UserRegister } from 'src/app/state/user/user.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  public registerForm: FormGroup;

  constructor(private facade: UserFacade, private router: Router) {
    this.registerForm = new FormGroup({
      username: new FormControl('', { validators: Validators.required }),
      email: new FormControl('', {
        validators: Validators.email,
        updateOn: 'blur',
      }),
      password: new FormControl('', {
        validators: Validators.required,
      }),
      age: new FormControl('', {
        validators: Validators.min(18),
      }),
    });
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

  public get age(): AbstractControl {
    return this.registerForm.get('age');
  }

  public register(): void {
    const register: UserRegister = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      age: this.registerForm.value.age,
    };
    this.facade.register(register);
  }

  public toLoginForm(): void {
    this.router.navigate(['/login']);
  }
}
