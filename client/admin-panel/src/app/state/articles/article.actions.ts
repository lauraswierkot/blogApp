import { createAction, props } from '@ngrx/store';

import { Article, ArticleResponse } from './article.model';

export const getArticles = createAction(
  '[Article] Get Articles'
);

export const getArticlesSuccess = createAction(
  '[Article] Get Articles',
  props<{ articles: ArticleResponse[] }>()
);

export const getArticlesFailed = createAction(
  '[Article] Get Articles',
  props<{ error: any }>()
);

export const createArticle = createAction(
  '[Article] Create Article',
  props<{ articleForm: FormData }>()
);

export const createArticleSuccess = createAction(
  '[Article] Create Article success',
  props<{ articleResponse: ArticleResponse }>()
);

export const createArticleFailed = createAction(
  '[Article] Create Article fail',
  props<{ error: Error }>()
);
