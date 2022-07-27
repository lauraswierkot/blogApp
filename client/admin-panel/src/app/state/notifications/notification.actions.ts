import { createAction, props } from '@ngrx/store';

import { Error, Message } from './notification.model';

export const createErrorNotification = createAction(
  '[Notification] Received Error Message',
  props<{ error: Error['error'] }>()
);

export const createSuccessNotification = createAction(
  '[Notification] Received Success Message',
  props<{ message: Message['message']}>()
);
