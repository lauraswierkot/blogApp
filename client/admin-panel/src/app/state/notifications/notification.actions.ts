import { createAction, props } from '@ngrx/store';

import { Notification } from './notification.model';
  
export const createNotification = createAction(
  '[Notification] Created Notification',
  props<{ notification: Notification }>()
); 

export const removeNotification = createAction(
  '[Notification] Removed Notification',
  props<{ id: string }>()
); 
