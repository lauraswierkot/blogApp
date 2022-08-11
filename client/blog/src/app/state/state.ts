import { ActionState } from '@core/actions/actions.model';
import { NotificationState } from './notifications/notification.model';
import { UserState } from './user/user.model';

export interface State {
  users: UserState;
  notifications: NotificationState;
  actions: ActionState
}
