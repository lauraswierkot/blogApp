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
  on(action.logout, (state) => ({ ...state, user: null, token: null })),
  on(action.getUsersSuccess, (state, { users }) => ({
    ...state,
    users,
  })),
  on(action.getUsersFailed, (state, { error }) => ({ ...state, error })),
  on(action.selectUserSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
  })),
  on(action.selectUserFailed, (state, { error }) => ({ ...state, error }))
);
