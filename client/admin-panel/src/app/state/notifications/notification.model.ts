import { HttpErrorResponse } from '@angular/common/http';

export type StatePart<K extends keyof NotificationState> = Pick<
  NotificationState,
  K
>;

export const notificationFeatureKey = 'notifications';

export enum NotificationType {
  Error = 'error',
  Message = 'message',
}

export interface Error extends HttpErrorResponse {}

export interface Notification {
  id?: string;
  message: string;
  notificationType: NotificationType;
}

export interface NotificationState {
  notifications: Notification[];
}

export const initialState: NotificationState = {
  notifications: [],
};
