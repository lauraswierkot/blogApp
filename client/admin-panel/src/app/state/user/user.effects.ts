import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.login),
      switchMap(({ loginForm }) => {
        return this.http.login(loginForm).pipe(
          map((loginResponse: User) => {
            this.router.navigate(['']);
            return action.loginSuccess({ loginResponse });
          }),
          catchError((error: HttpErrorResponse) => [
            action.loginFailed({ error }),
          ])
        );
      })
    )
  );
  
  loginFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(action.loginFailed),
        tap(({ error }) => {
          if(typeof error.error.error == "string"){
            this.snackBar.open(error.error.error, 'x')
          } else {
          error.error.error.forEach((element) => {
            this.snackBar.open(element, 'x', {horizontalPosition: 'end' });
          });}
        })
      ),
    { dispatch: false }
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

  register$ = createEffect(()=>
    this.actions$.pipe(
      ofType(action.register),
      switchMap(({ registerForm }) => {
        return this.http.register(registerForm).pipe(
          map((registerResponse: User) => {
            this.router.navigate(['']);
            return action.registerSuccess({ registerResponse });
          }),
          catchError((error: HttpErrorResponse) => [
            action.registerFailed({ error }),
          ])
        );
      })
    )
  );
}
