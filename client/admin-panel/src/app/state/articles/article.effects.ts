import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as uuid from 'uuid';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, switchMap } from 'rxjs';
import { map } from 'rxjs';

import * as action from './article.actions';
import * as notificationAction from '@state/notifications/notification.actions';
import { HttpService } from '@core/index';
import { Article } from './article.model';
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

  getArticleImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.getArticleImage),
      switchMap(({ slug, imageTitle }) => {
        return this.http.getImage(imageTitle).pipe(
          map((blob) => {
            return action.getArticleImageSuccess({
              slug,
              blob: 'blob',
            });
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
}
