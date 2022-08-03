import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, switchMap } from 'rxjs';
import { map } from 'rxjs';

import * as action from './article.actions';
import * as notificationAction from '@state/notifications/notification.actions';
import { HttpService } from '@core/index';
import { Article, Comment } from './article.model';
import { NotificationType } from '@state/notifications/notification.model';

@Injectable()
export class ArticleEffects {
  constructor(
    private actions$: Actions,
    private http: HttpService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.createArticle),
      switchMap(({ articleForm }) => {
        return this.http.createArticle(articleForm).pipe(
          map((article: Article) => {
            this.router.navigate(['articles-panel']);
            notificationAction.createNotification({
              message: 'Article created',
              notificationType: NotificationType.Message,
            });
            return action.createArticleSuccess({ article });
          }),
          catchError((error: HttpErrorResponse) => [
            action.createArticleFailed(error),
            notificationAction.createNotification({
              message: error.error.error,
              notificationType: NotificationType.Error,
            }),
          ])
        );
      })
    )
  );

  getArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.getArticles),
      switchMap(({ searchTerm }) => {
        return this.http.getArticles(searchTerm).pipe(
          map((articles: Article[]) => {
            return action.getArticlesSuccess({ articles });
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
      switchMap(({ article }) => {
        return this.http.getArticle(article.slug).pipe(
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

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.deleteArticle),
      switchMap(({ slug }) => {
        return this.http.deleteArticle(slug).pipe(
          map((article: Article) => {
            notificationAction.createNotification({
              message: 'Article deleted',
              notificationType: NotificationType.Message,
            });
            return action.deleteArticleSuccess({ slug });
          }),
          catchError((error: HttpErrorResponse) => [
            action.deleteArticleFailed(error),
            notificationAction.createNotification({
              message: error.error.error,
              notificationType: NotificationType.Error,
            }),
          ])
        );
      })
    )
  );

  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.updateArticle),
      switchMap(({ slug, articleForm }) => {
        return this.http.updateArticle(slug, articleForm).pipe(
          map((article: Article) => {
            this.router.navigate(['articles-panel']);
            notificationAction.createNotification({
              message: 'Article created',
              notificationType: NotificationType.Message,
            });
            return action.updateArticleSuccess({ slug, article });
          }),
          catchError((error: HttpErrorResponse) => [
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
      switchMap(({slug, body}) => {
        return this.http.createComment(slug, body).pipe(
          map((comment: Comment) => {
            notificationAction.createNotification({
              message: 'Comment created',
              notificationType: NotificationType.Message,
            });
            return action.createCommentSuccess({slug, comment});
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

  editComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.updateComment),
      switchMap(({ slug, body, id }) => {
        return this.http.updateComment(slug, body, id).pipe(
          map((comment: Comment) => {
            notificationAction.createNotification({
              message: 'Comment updated',
              notificationType: NotificationType.Message,
            });
            return action.updateCommentSuccess({ id, comment });
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
          map((comment: Comment) => {
            notificationAction.createNotification({
              message: 'Comment deleted',
              notificationType: NotificationType.Message,
            });
            return action.deleteCommentSuccess({ slug, id });
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
