import { createAction, props } from '@ngrx/store';
import { Error } from '@state/notifications/notification.model';

import { Article, GetArticlePayload, Comment } from './article.model';

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

export const createComment = createAction(
  '[Comment] Create Comment Request',
  props<{ slug: string; body: Comment['body'] }>()
);

export const createCommentSuccess = createAction(
  '[Comment] Create Comment Success',
  props<{ slug: string; comment: Comment }>()
);

export const createCommentFailed = createAction(
  '[Comment] Create Comment Fail',
  props<{ error: Error }>()
);

export const createCommentByAnonim = createAction(
  '[Comment] Create Comment By Anonim Request',
  props<{ slug: string; body: Comment['body'] }>()
);

export const createCommentByAnonimSuccess = createAction(
  '[Comment] Create Comment By Anonim Success',
  props<{ slug: string; comment: Comment }>()
);

export const createCommentByAnonimFailed = createAction(
  '[Comment] Create Comment By Anonim Fail',
  props<{ error: Error }>()
);

export const updateComment = createAction(
  '[Comment] Update Comment Request',
  props<{ slug: string; body: Comment['body']; id: Comment['id'] }>()
);

export const updateCommentSuccess = createAction(
  '[Comment] Update Comment Success',
  props<{ id: Comment['id']; body: Comment['body'] }>()
);

export const updateCommentFailed = createAction(
  '[Comment] Update Comment Fail',
  props<{ error: Error }>()
);

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
