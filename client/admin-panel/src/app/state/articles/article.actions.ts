import { createAction, props } from '@ngrx/store';
import { Error } from '@state/notifications/notification.model';

import { Article, Comment, GetArticlePayload } from './article.model';

export const getArticles = createAction(
  '[Article] Get Articles Request',
  props<{ payload: GetArticlePayload }>()
);

export const getArticlesSuccess = createAction(
  '[Article] Get Articles Success',
  props<{ articles: Article[] }>()
);

export const getArticlesFailed = createAction(
  '[Article] Get Articles Fail',
  props<{ error: Error }>()
);

export const setArticlesCount = createAction(
  '[Article] Set Articles Count',
  props<{ articlesCount: number }>()
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
  props<{ slug: Article['slug'] }>()
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

export const deleteComment = createAction(
  '[Comment] Delete Comment Request',
  props<{ slug: Article['slug']; id: Comment['id'] }>()
);

export const deleteCommentSuccess = createAction(
  '[Comment] Delete Comment Success',
  props<{ slug: Article['slug']; id: Comment['id'] }>()
);

export const deleteCommentFailed = createAction(
  '[Comment] Delete Comment Fail',
  props<{ error: Error }>()
);
