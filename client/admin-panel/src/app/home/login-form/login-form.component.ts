import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { UserFacade, UserLogin } from '@state/index';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  public loginForm: FormGroup;

  constructor(private facade: UserFacade, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: Validators.email,
        updateOn: 'blur',
      }),
      password: new FormControl('', {
        validators: Validators.required,
      }),
    });
  }

  public get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  public get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  public login(): void {
    const login: UserLogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.facade.login(login);
  }

  public toRegisterForm(): void {
    this.router.navigate(['/register']);
  }
}
