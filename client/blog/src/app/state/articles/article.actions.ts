import { createAction, props } from '@ngrx/store';
import { Error } from '@state/notifications/notification.model';

import { Article, GetArticlePayload } from './article.model';

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
