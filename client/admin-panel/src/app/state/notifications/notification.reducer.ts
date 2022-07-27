import { Action, createReducer, on } from '@ngrx/store';

import { NotificationState, initialState } from './notification.model';
import * as action from './notification.actions';


export function notificationReducer(
  state: NotificationState = initialState,
  action: Action
): NotificationState {
  return reducer(state, action);
}

export const reducer = createReducer(
  initialState,
  on(action.createErrorNotification, (state, { error }) => ({
    ...state, error: error })),
  on(action.resetErrorNotification, (state) => ({...state, erxror: null})),
  on(action.createSuccessNotification, (state, { message }) => ({ ...state, message: message }))
);
