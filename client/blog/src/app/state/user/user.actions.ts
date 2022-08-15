import { createAction, props } from '@ngrx/store';

import { UserLogin, User, UpdateUser } from './user.model';
import { Error } from '@state/notifications/notification.model';

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

export const changePassword = createAction(
  '[User] Change Password Request',
  props<{ token: string; user: UpdateUser }>()
);

export const changePasswordSuccess = createAction(
  '[User] Change Password Request Success'
);

export const changePasswordFailed = createAction(
  '[User] Change Password Request Fail',
  props<{ error: Error }>()
);

export const sendReminderPasswordEmail = createAction(
  '[User] Send Reminder Password Request',
  props<{ email: string }>()
);

export const sendReminderPasswordEmailSuccess = createAction(
  '[User] Send Reminder Password Success'
);

export const sendReminderPasswordEmailFailed = createAction(
  '[User] Send Reminder Password Fail',
  props<{ error: Error }>()
);
