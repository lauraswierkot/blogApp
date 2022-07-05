import { Action, createReducer } from '@ngrx/store';
import { initialState, UserState } from './user.model';

export const reducer = createReducer(initialState);

export function userReducer(
  state: UserState = initialState,
  action: Action
): UserState {
  return reducer(state, action);
}
