import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  notificationFeatureKey,
  NotificationState,
} from './notification.model';

export const selectNotificationState = createFeatureSelector<NotificationState>(
  notificationFeatureKey
);

export const selectNotifications = createSelector(
  selectNotificationState,
  (state) => state.notifications
);
