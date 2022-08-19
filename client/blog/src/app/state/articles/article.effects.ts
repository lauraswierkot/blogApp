import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, switchMap } from 'rxjs';
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
    private http: HttpService
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
}
