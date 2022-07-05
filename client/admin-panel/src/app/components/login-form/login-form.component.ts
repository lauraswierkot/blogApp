import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/services/http.service';
import { login, logout } from 'src/app/state/user/user.actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  public loginForm: FormGroup;
  constructor(private store: Store, private http: HttpService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  public login(loginForm: FormGroup): void {
    let credentials = {
      email: loginForm.value.email,
      password: loginForm.value.password,
    };
    this.http
      .login(credentials)
      .subscribe((value) => this.store.dispatch(login({ user: value.user })));
  }

  public logout(): void {
    this.store.dispatch(logout());
  }
}
