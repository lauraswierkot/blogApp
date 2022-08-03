import { createAction, props } from '@ngrx/store';
import { Error } from '@state/notifications/notification.model';

import { Article } from './article.model';

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
  '[Article] Article Selected Request',
  props<{ article: Article }>()
);

export const resetArticle = createAction('[Article] Article Reset');

export const createComment = createAction(
  '[Comment] Create Comment Request',
  props<{ article: Article }>()
);

export const createCommentSuccess = createAction(
  '[Comment] Create Comment Success',
  props<{ slug: string; article: Article }>()
);

export const createCommentFailed = createAction(
  '[Comment] Create Comment Fail',
  props<{ error: Error }>()
);
