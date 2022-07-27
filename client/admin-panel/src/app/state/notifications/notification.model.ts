export type StatePart<K extends keyof NotificationState> = Pick<NotificationState, K>;

export const notificationFeatureKey = 'notifications';

export interface Error {
  error: {
    error: string | string[];
    statusCode: string;
  };
}

export interface Message {
  message: string;
}

export interface NotificationState {
  error: Error | null;
  message: Message | null;
}

export const initialState: NotificationState = {
  error: null,
  message: null
};
