import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as selector from './user.selectors';
import * as action from './user.actions';
import { UserLogin, UserRegister } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  public user$ = this.store.select(selector.selectUserData);
  public token$ = this.store.select(selector.selectToken);

  constructor(private store: Store) {}

  public login(loginForm: UserLogin): void {
    this.store.dispatch(action.login({ loginForm }));
  }

  public logout(): void {
    this.store.dispatch(action.logout());
  }

  public register(registerForm: UserRegister): void {
    this.store.dispatch(action.register({registerForm}));
  }
}
