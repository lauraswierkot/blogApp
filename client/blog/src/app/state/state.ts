import { ActionState } from '@core/actions/actions.model';
import { ArticleState } from './articles/article.model';
import { NotificationState } from './notifications/notification.model';
import { UserState } from './user/user.model';

export interface State {
  users: UserState;
  notifications: NotificationState;
  actions: ActionState;
  articles: ArticleState;
}
