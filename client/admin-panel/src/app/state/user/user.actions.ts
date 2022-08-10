import { createAction, props } from '@ngrx/store';

import { GetUserPayload, User, UserLogin, UserRegister } from './user.model';
import { Error } from '@state/notifications/notification.model';

export const getUsers = createAction(
  '[User] Get Users Request',
  props<{ payload: GetUserPayload }>()
);

export const getUsersSuccess = createAction(
  '[User] Get Users Success',
  props<{ users: User[] }>()
);

export const getUsersFailed = createAction(
  '[User] Get Users Fail',
  props<{ error: Error }>()
);

export const setUsersCount = createAction(
  '[User] Set Users Count',
  props<{ usersCount: number }>()
);

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

export const logout = createAction('[User] Logout Request');

export const register = createAction(
  '[User] Register User Request',
  props<{ registerForm: UserRegister }>()
);

export const registerSuccess = createAction(
  '[User] Register User Success',
  props<{ registerResponse: User }>()
);

export const registerFailed = createAction(
  '[User] Register User Fail',
  props<{ error: Error }>()
);

export const confirmEmail = createAction(
  '[User] Confirm Email Request',
  props<{ token: string }>()
);

export const confirmEmailSuccess = createAction('[User] Confirm Email Success');

export const confirmEmailFailed = createAction(
  '[User] Confirm Email Fail',
  props<{ error: Error }>()
);

export const selectUser = createAction(
  '[User] Select User Request',
  props<{ username: User['username'] }>()
);

export const selectUserSuccess = createAction(
  '[User] Select User Success',
  props<{ user: User }>()
);

export const selectUserFailed = createAction(
  '[User] Select User Fail',
  props<{ error: Error }>()
);
