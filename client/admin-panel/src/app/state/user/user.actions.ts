import { createAction, props } from '@ngrx/store';

import { User, UserLogin, UserRegister } from './user.model';

export const login = createAction(
  '[User] Login User',
  props<{ loginForm: UserLogin }>()
);

export const loginSuccess = createAction(
  '[User] Login user success',
  props<{ loginResponse: User }>()
);

export const loginFailed = createAction('[User] Login user fail');

export const logout = createAction('[User] Logout');

export const register = createAction(
  '[User] Register User',
  props<{ registerForm: UserRegister }>()
);

export const registerSuccess = createAction(
  '[User] Register user success',
  props<{ registerResponse: User }>()
);

export const registerFailed = createAction('[User] Register user fail');

export const confirmEmail = createAction(
  '[User] Confirm email',
  props<{ token: string }>()
);

export const confirmEmailSuccess = createAction('[User] Confirm email success');

export const confirmEmailFailed = createAction('[User] Confirm email fail');
