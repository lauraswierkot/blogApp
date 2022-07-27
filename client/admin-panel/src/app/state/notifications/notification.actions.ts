import { createAction, props } from '@ngrx/store';

import { Error, Message } from './notification.model';

export const createErrorNotification = createAction(
  '[Notification] Created Error Message',
  props<{ error: Error }>()
);

export const resetErrorNotification = createAction(
  '[Notification] Reset Error Message'
);

export const createSuccessNotification = createAction(
  '[Notification] Created Success Message',
  props<{ message: Message }>()
);
