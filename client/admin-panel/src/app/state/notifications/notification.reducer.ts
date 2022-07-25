import { Action, createReducer, on } from '@ngrx/store';
import { initialState, NotificationState } from './notification.model';

export function notificationReducer(
  state: NotificationState = initialState,
  action: Action
): NotificationState {
  return reducer(state, action);
}

export const reducer = createReducer(
  initialState,
);
