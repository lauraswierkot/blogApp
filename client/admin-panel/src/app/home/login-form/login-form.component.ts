import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Store } from '@ngrx/store';

import { UserFacade } from 'src/app/state/user/user.facade';
import { UserLogin } from 'src/app/state/user/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  public loginForm: FormGroup;

  constructor(private store: Store, private facade: UserFacade) {
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

  public logout(): void {
    this.facade.logout();
  }
}
