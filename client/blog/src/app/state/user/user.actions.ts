import { createAction, props } from '@ngrx/store';

import { UserLogin, User } from './user.model';

export const login = createAction(
  '[User] Login User Request',
  props<{ loginForm: UserLogin }>()
);

export const loginSuccess = createAction(
  '[User] Login User Success',
  props<{ loginResponse: User }>()
);

export const loginFailed = createAction(
  '[User] Login User Fail',
  props<{ error: Error }>()
);
