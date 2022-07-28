import * as uuid from 'uuid';

export type StatePart<K extends keyof NotificationState> = Pick<
  NotificationState,
  K
>;

export const notificationFeatureKey = 'notifications';

export enum NotificationType {
  Error = 'error',
  Message = 'message',
}

export interface Notification {
  id: uuid.v4;
  message: string;
  notificationType: NotificationType;
}

export interface NotificationState {
  notifications: Notification[];
}

export const initialState: NotificationState = {
  notifications: [],
};
