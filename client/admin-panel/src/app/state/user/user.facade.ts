import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as selector from './user.selectors';
import * as action from './user.actions';
import { User, UserLogin, UserRegister } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  public user$ = this.store.select(selector.selectUserData);
  public selectedUser$ = this.store.select(selector.selectSelectedUser);
  public users$ = this.store.select(selector.selectUsersData);
  public token$ = this.store.select(selector.selectToken);

  constructor(private store: Store) {}

  public getUsers(searchTerm: string = ''): void {
    this.store.dispatch(action.getUsers({ searchTerm }));
  }

  public selectUser(username: User['username']): void {
    this.store.dispatch(action.selectUser({ username }));
  }

  public login(loginForm: UserLogin): void {
    this.store.dispatch(action.login({ loginForm }));
  }

  public logout(): void {
    this.store.dispatch(action.logout());
  }

  public register(registerForm: UserRegister): void {
    this.store.dispatch(action.register({ registerForm }));
  }

  public confirmEmail(token: string): void {
    this.store.dispatch(action.confirmEmail({ token }));
  }
}
