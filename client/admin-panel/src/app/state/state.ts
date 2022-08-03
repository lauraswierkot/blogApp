import { ActionsState } from '@core/actions/actions.model';
import { ArticleState, NotificationState, UserState } from '.';

export interface State {
  users: UserState;
  articles: ArticleState;
  notifications: NotificationState;
  actions: ActionsState;
}
