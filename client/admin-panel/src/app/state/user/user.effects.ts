import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, switchMap, tap } from 'rxjs';
import { map } from 'rxjs';

import * as action from './user.actions';
import { HttpService } from 'src/app/core';
import { User } from './user.model';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private http: HttpService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.login),
      switchMap(({ loginForm }) => {
        return this.http.login(loginForm).pipe(
          map((loginResponse: User) => action.loginSuccess({ loginResponse })),
          tap(()=> {
            return this.router.navigate(['']);
          }),
          catchError((error: HttpErrorResponse) => [
            action.loginFailed({ error }),
          ])
        );
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(action.logout),
        tap(() => {
          return this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
