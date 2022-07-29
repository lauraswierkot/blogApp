import { Action, createReducer, on } from '@ngrx/store';
import * as uuid from 'uuid';

import { NotificationState, initialState } from './notification.model';

import * as action from './notification.actions';
import * as cloneDeep from 'lodash/cloneDeep';

export function notificationReducer(
  state: NotificationState = initialState,
  action: Action
): NotificationState {
  return reducer(state, action);
}

export const reducer = createReducer(
  initialState,
  on(action.createNotification, (state, { notification }) => {
    const newNotification = { ...notification, id: uuid.v4() };
    return {
      ...state,
      notifications: [...state.notifications, newNotification],
    };
  }),
  on(action.removeNotification, (state, { id }) => {
    return {
      ...state,
      notifications: state.notifications.filter((value) => value.id != id),
    };
  })
);
