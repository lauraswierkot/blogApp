import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router,
    private translate: TranslateService
  ) {}

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.createArticle),
      switchMap(({ articleForm }) => {
        return this.http.createArticle(articleForm).pipe(
          switchMap((article: Article) => {
            this.router.navigate(['articles-panel']);
            return [
              notificationAction.createNotification({
                message: this.translate.instant('notification.articleCreated'),
                notificationType: NotificationType.Message,
              }),
              action.createArticleSuccess({ article }),
            ];
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

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.deleteArticle),
      switchMap(({ slug }) => {
        return this.http.deleteArticle(slug).pipe(
          switchMap((article: Article) => {
            return [
              notificationAction.createNotification({
                message: this.translate.instant('notification.articleDeleted'),
                notificationType: NotificationType.Message,
              }),
              action.deleteArticleSuccess({ slug }),
            ];
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
          switchMap((article: Article) => {
            this.router.navigate(['articles-panel']);
            return [
              notificationAction.createNotification({
                message: this.translate.instant('notification.articleUpdated'),
                notificationType: NotificationType.Message,
              }),
              action.updateArticleSuccess({ slug, article }),
            ];
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
