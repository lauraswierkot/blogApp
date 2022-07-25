import { ArticleState, UserState } from ".";
import { NotificationState } from "./notifications/notification.model";

export interface State {
  users: UserState;
  articles: ArticleState,
  notifications: NotificationState
}
