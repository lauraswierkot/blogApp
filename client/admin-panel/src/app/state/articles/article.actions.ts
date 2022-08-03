import { createAction, props } from '@ngrx/store';

import { Article } from './article.model';

export const getArticles = createAction(
  '[Article] Get Articles',
  props<{ searchTerm: string }>()
);

export const getArticlesSuccess = createAction(
  '[Article] Get Articles success',
  props<{ articles: Article[] }>()
);

export const getArticlesFailed = createAction(
  '[Article] Get Articles faile',
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
  props<{ slug: string; articleForm: FormData }>()
);

export const updateArticleSuccess = createAction(
  '[Article] Update Article success',
  props<{ slug: string; article: Article }>()
);

export const updateArticleFailed = createAction(
  '[Article] Update Article fail',
  props<{ error: Error }>()
);

export const selectArticle = createAction(
  '[Article] Article Selected',
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
