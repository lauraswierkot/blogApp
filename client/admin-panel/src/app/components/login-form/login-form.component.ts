import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  public login(): void {
    const login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    } as UserLogin;
    this.facade.login(login);
  }

  public logout(): void {
    this.facade.logout();
  }
}
