import { createAction, props } from '@ngrx/store';
import { AuthResponse, Login } from './user.model';

export const login = createAction(
  '[Login] User logged in',
  props<{ user: AuthResponse }>()
);

export const logout = createAction('[Login] User logged out');
