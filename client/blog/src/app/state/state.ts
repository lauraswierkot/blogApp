import { NotificationState } from './notifications/notification.model';
import { UserState } from './user/user.model';

export interface State {
  users: UserState;
  notifications: NotificationState;
}
