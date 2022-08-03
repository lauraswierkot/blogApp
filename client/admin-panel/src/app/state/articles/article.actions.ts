import { createAction, props } from '@ngrx/store';
import { Error } from '@state/notifications/notification.model';

import { Article, Comment } from './article.model';

export const getArticles = createAction(
  '[Article] Get Articles Request',
  props<{ searchTerm: string }>()
);

export const getArticlesSuccess = createAction(
  '[Article] Get Articles Success',
  props<{ articles: Article[] }>()
);

export const getArticlesFailed = createAction(
  '[Article] Get Articles Fail',
  props<{ error: Error }>()
);

export const createArticle = createAction(
  '[Article] Create Article Request',
  props<{ articleForm: FormData }>()
);

export const createArticleSuccess = createAction(
  '[Article] Create Article Success',
  props<{ article: Article }>()
);

export const createArticleFailed = createAction(
  '[Article] Create Article Fail',
  props<{ error: Error }>()
);

export const deleteArticle = createAction(
  '[Article] Delete Article Request',
  props<{ slug: string }>()
);

export const deleteArticleSuccess = createAction(
  '[Article] Delete Article Success',
  props<{ slug: string }>()
);

export const deleteArticleFailed = createAction(
  '[Article] Delete Article Fail',
  props<{ error: Error }>()
);

export const updateArticle = createAction(
  '[Article] Update Article Request',
  props<{ slug: string; articleForm: FormData }>()
);

export const updateArticleSuccess = createAction(
  '[Article] Update Article Success',
  props<{ slug: string; article: Article }>()
);

export const updateArticleFailed = createAction(
  '[Article] Update Article Fail',
  props<{ error: Error }>()
);

export const selectArticle = createAction(
  '[Article] Select Article Request',
  props<{ article: Article }>()
);

export const selectArticleSuccess = createAction(
  '[Article] Select Article Success',
  props<{ article: Article }>()
);

export const selectArticleFailed = createAction(
  '[Article] Select Article Fail',
  props<{ error: Error }>()
);

export const resetArticle = createAction('[Article] Article Reset');

export const createComment = createAction(
  '[Comment] Create Comment Request',
  props<{ slug: string; body: string }>()
);

export const createCommentSuccess = createAction(
  '[Comment] Create Comment Success',
  props<{ slug: string; comment: Comment }>()
);

export const createCommentFailed = createAction(
  '[Comment] Create Comment Fail',
  props<{ error: Error }>()
);

export const updateComment = createAction(
  '[Comment] Update Comment Request',
  props<{ slug: string; body: string; id: string }>()
);

export const updateCommentSuccess = createAction(
  '[Comment] Update Comment Success',
  props<{ id: string; comment: Comment }>()
);

export const updateCommentFailed = createAction(
  '[Comment] Update Comment Fail',
  props<{ error: Error }>()
);

export const deleteComment = createAction(
  '[Comment] Delete Comment Request',
  props<{ slug: string; id: string }>()
);

export const deleteCommentSuccess = createAction(
  '[Comment] Delete Comment Success',
  props<{ slug: string; id: string }>()
);

export const deleteCommentFailed = createAction(
  '[Comment] Delete Comment Fail',
  props<{ error: Error }>()
);
