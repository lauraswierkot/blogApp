import { createAction, props } from '@ngrx/store';

import { User, UserLogin } from './user.model';

export const login = createAction(
  '[User] Login User',
  props<{ loginForm: UserLogin }>()
);

export const loginSuccess = createAction(
  '[User] Login user success',
  props<{ loginResponse: User }>()
);

export const loginFailed = createAction(
  '[User] Logi user fail',
  props<{ error: any }>()
);

export const logout = createAction('[User] Logout');
