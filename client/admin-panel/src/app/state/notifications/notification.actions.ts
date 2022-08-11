import { createAction, props } from '@ngrx/store';

import { Notification } from './notification.model';

export const createNotification = createAction(
  '[Notification] Create Notification',
  props<{
    message: Notification['message'];
    notificationType: Notification['notificationType'];
  }>()
);

export const removeNotification = createAction(
  '[Notification] Remove Notification',
  props<{ id: string }>()
);
