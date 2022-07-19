import { Action, createReducer, on } from '@ngrx/store';
import { initialState, UserState } from './user.model';
import * as action from './user.actions';

export function userReducer(
  state: UserState = initialState,
  action: Action
): UserState {
  return reducer(state, action);
}

export const reducer = createReducer(
  initialState,
  on(action.loginSuccess, (state, { loginResponse }) => ({
    ...state,
    user: loginResponse,
    token: loginResponse.token,
  })),
  on(action.loginFailed, (state, { error }) => ({ ...state, error: error.error})),
  on(action.logout, (state) => ({ ...state, user: null, token: null })),
  on(action.registerFailed, (state,{ error }) => ({...state, error: error.error}))
);
