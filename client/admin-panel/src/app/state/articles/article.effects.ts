import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, switchMap } from 'rxjs';
import { map } from 'rxjs';

import * as action from './article.actions';
import * as notificationAction from '@state/notifications/notification.actions';
import { HttpService } from '@core/index';
import { Article, Comment } from './article.model';
import { NotificationType } from '@state/notifications/notification.model';
import { Store } from '@ngrx/store';
import { setArticlesCount } from './article.actions';

@Injectable()
export class ArticleEffects {
  constructor(
    private actions$: Actions,
    private http: HttpService,
    private router: Router,
    public snackBar: MatSnackBar,
    private store: Store
  ) {}

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.createArticle),
      switchMap(({ articleForm }) => {
        return this.http.createArticle(articleForm).pipe(
          map((article: Article) => {
            this.router.navigate(['articles-panel']);
            notificationAction.createNotification({
              message: "{{'notification.articleCreated' | translate}}",
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
      switchMap(({ limit, page, searchTerm }) => {
        return this.http.getArticles(limit, page, searchTerm).pipe(
          map(({ articles, articlesCount }) => {
            this.store.dispatch(setArticlesCount({ articlesCount }));
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

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.deleteArticle),
      switchMap(({ slug }) => {
        return this.http.deleteArticle(slug).pipe(
          map((article: Article) => {
            notificationAction.createNotification({
              message: "{{'notification.articleDeleted' | translate}}",
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
              message: "{{'notification.articleUpdated' | translate}}",
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

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.deleteComment),
      switchMap(({ slug, id }) => {
        return this.http.deleteComment(slug, id).pipe(
          map((comment: Comment) => {
            notificationAction.createNotification({
              message: "{{'notification.commentDeleted' | translate}}",
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
