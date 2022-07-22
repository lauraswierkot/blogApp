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

export const deleteArticle = createAction(
  '[Article] Delete Article',
  props<{ slug: string }>()
);

export const deleteArticleSuccess = createAction(
  '[Article] Delete Article success',
  props<{ slug: string }>()
);

export const deleteArticleFailed = createAction(
  '[Article] Delete Article fail',
  props<{ error: Error }>()
);

export const updateArticle = createAction(
  '[Article] Update Article',
  props<{ slug: string, articleForm: FormData }>()
);

export const updateArticleSuccess = createAction(
  '[Article] Update Article success',
  props<{ slug: string, article: Article }>()
);

export const updateArticleFailed = createAction(
  '[Article] Update Article fail',
  props<{ error: Error }>()
);

export const selectArticle = createAction(
  '[Article] Article Selected',
  props<{ article: Article }>()
);

export const resetArticle = createAction(
  '[Article] Article Reset'
);
