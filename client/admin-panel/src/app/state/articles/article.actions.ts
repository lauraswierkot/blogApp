import { createAction, props } from '@ngrx/store';

import { Article, ArticleForm } from './article.model';

export const createArticle = createAction(
  '[Article] Create Article',
  props<{ articleForm: ArticleForm }>()
);

export const createArticleSuccess = createAction(
  '[Article] Create Article success',
  props<{ articleResponse: Article }>()
);

export const createArticleFailed = createAction(
  '[Article] Create Article fail',
  props<{ error: Error }>()
);
