import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  notificationFeatureKey,
  NotificationState,
} from './notification.model';

export const selectNotificationState = createFeatureSelector<NotificationState>(
  notificationFeatureKey
);

export const selectErrorData = createSelector(
  selectNotificationState,
  (state) => state.error
);

export const selectMessageData = createSelector(
  selectNotificationState,
  (state) => state.message
);
