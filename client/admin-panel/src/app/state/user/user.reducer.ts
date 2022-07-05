import { createReducer, on } from '@ngrx/store';
import { initialState } from './user.state';
import { login, logout } from './user.actions';

export const userReducer = createReducer(
  initialState,
  on(login, (state, user) => user),
  on(logout, (state) => initialState)
);
