import { ArticleState, UserState } from ".";

export interface State {
  users: UserState;
  articles: ArticleState
}
