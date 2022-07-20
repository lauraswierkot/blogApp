import { createAction, props } from '@ngrx/store';

import { Article } from './article.model';

export const getArticles = createAction('[Article] Get Articles');

export const getArticlesSuccess = createAction(
  '[Article] Get Articles Success',
  props<{ articles: Article[] }>()
);

export const getArticlesFailed = createAction(
  '[Article] Get Articles Failed',
  props<{ error: Error }>()
);

export const createArticle = createAction(
  '[Article] Create Article',
  props<{ articleForm: FormData }>()
);

export const createArticleSuccess = createAction(
  '[Article] Create Article success',
  props<{ article: Article }>()
);

export const createArticleFailed = createAction(
  '[Article] Create Article fail',
  props<{ error: Error }>()
);
