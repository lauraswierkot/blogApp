import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, switchMap } from 'rxjs';
import { map, tap } from 'rxjs';

import * as action from './article.actions';
import { HttpService } from '@core/index';
import { Article } from './article.model';

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
            this.router.navigate(['']);
            return action.createArticleSuccess({ article });
          }),
          catchError((error: HttpErrorResponse) => [
            action.createArticleFailed({ error }),
          ])
        );
      })
    )
  );

  createArticleFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(action.createArticleFailed),
        tap(({ error }) => {
          this.snackBar.open(error.message, 'x');
        })
      ),
    { dispatch: false }
  );

  getArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.getArticles),
      switchMap(() => {
        return this.http.getArticles().pipe(
          map((articles: Article[]) => {
            return action.getArticlesSuccess({ articles });
          }),
          catchError((error: HttpErrorResponse) => [
            action.getArticlesFailed({ error }),
          ])
        );
      })
    )
  );
}
