import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, switchMap } from 'rxjs';
import { map } from 'rxjs';

import * as action from './article.actions';
import * as notificationAction from '@state/notifications/notification.actions';
import { HttpService } from '@core/index';
import { Article, Comment } from './article.model';
import { NotificationType } from '@state/notifications/notification.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ArticleEffects {
  constructor(
    private actions$: Actions,
    private http: HttpService,
    private translate: TranslateService
  ) {}

  getArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.getArticles),
      switchMap(({ payload }) => {
        return this.http.getArticles(payload).pipe(
          switchMap((response) => {
            return [
              action.getArticlesSuccess({ articles: response.articles }),
              action.setArticlesCount({ articlesCount: response.total }),
            ];
          }),
          catchError((error: HttpErrorResponse) => [
            action.getArticlesFailed(error),
            notificationAction.createNotification({
              message: error.error.error,
              notificationType: NotificationType.Error,
            }),
          ])
        );
      })
    )
  );

  selectArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.selectArticle),
      switchMap(({ slug }) => {
        return this.http.getArticle(slug).pipe(
          map((article: Article) => {
            return action.selectArticleSuccess({ article });
          }),
          catchError((error: HttpErrorResponse) => [
            action.selectArticleFailed(error),
            notificationAction.createNotification({
              message: error.error.error,
              notificationType: NotificationType.Error,
            }),
          ])
        );
      })
    )
  );

  createComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.createComment),
      switchMap(({ slug, body }) => {
        return this.http.createComment(slug, body).pipe(
          switchMap((comment: Comment) => {
            return [
              notificationAction.createNotification({
                message: 'Comment created',
                notificationType: NotificationType.Message,
              }),
              action.createCommentSuccess({ slug, comment }),
            ];
          }),
          catchError((error: HttpErrorResponse) => [
            action.createCommentFailed(error),
            notificationAction.createNotification({
              message: error.error.error,
              notificationType: NotificationType.Error,
            }),
          ])
        );
      })
    )
  );

  createCommentByAnonim$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.createCommentByAnonim),
      switchMap(({ slug, body }) => {
        return this.http.createCommentByAnonim(slug, body).pipe(
          switchMap((comment: Comment) => {
            return [
              notificationAction.createNotification({
                message: 'Comment created',
                notificationType: NotificationType.Message,
              }),
              action.createCommentByAnonimSuccess({ slug, comment }),
            ];
          }),
          catchError((error: HttpErrorResponse) => [
            action.createCommentByAnonimFailed(error),
            notificationAction.createNotification({
              message: error.error.error,
              notificationType: NotificationType.Error,
            }),
          ])
        );
      })
    )
  );

  editComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.updateComment),
      switchMap(({ slug, body, id }) => {
        return this.http.updateComment(slug, body, id).pipe(
          switchMap((comment: Comment) => {
            return [
              notificationAction.createNotification({
                message: 'Comment updated',
                notificationType: NotificationType.Message,
              }),
              action.updateCommentSuccess({ id, body }),
            ];
          }),
          catchError((error: HttpErrorResponse) => [
            action.updateCommentFailed(error),
            notificationAction.createNotification({
              message: error.error.error,
              notificationType: NotificationType.Error,
            }),
          ])
        );
      })
    )
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.deleteComment),
      switchMap(({ slug, id }) => {
        return this.http.deleteComment(slug, id).pipe(
          switchMap((comment: Comment) => {
            return [
              notificationAction.createNotification({
                message: this.translate.instant('notification.commentDeleted'),
                notificationType: NotificationType.Message,
              }),
              action.deleteCommentSuccess({ slug, id }),
            ];
          }),
          catchError((error: HttpErrorResponse) => [
            action.deleteCommentFailed(error),
            notificationAction.createNotification({
              message: error.error.error,
              notificationType: NotificationType.Error,
            }),
          ])
        );
      })
    )
  );
}
