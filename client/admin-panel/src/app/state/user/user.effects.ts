import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, switchMap, tap } from 'rxjs';
import { map } from 'rxjs';

import * as action from './user.actions';
import { HttpService } from '@core/index';
import { User } from './user.model';
import { NotificationFacade } from '@state/notifications/notification.facade';
import { Message } from '@state/notifications/notification.model';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private http: HttpService,
    private router: Router,
    private notificationFacade: NotificationFacade,
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
          this.notificationFacade.sendErrorNotification(error.error);
        })
      ),
    { dispatch: false }
  );

  registerFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(action.registerFailed),
        tap(({ error }) => {
          this.notificationFacade.sendErrorNotification(error.error);
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

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.register),
      switchMap(({ registerForm }) => {
        return this.http.register(registerForm).pipe(
          map((registerResponse: User) => {
            const message: Message = {
              message: 'Successfully registered. Please confirm via email.',
            };
            this.router.navigate(['/login']);
            return action.registerSuccess({ registerResponse, message });
          }),
          catchError((error: HttpErrorResponse) => [
            action.registerFailed({ error }),
          ])
        );
      })
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(action.registerSuccess),
        tap(({ message }) => {
          this.notificationFacade.sendSuccessNotification(message.message);
        })
      ),
    { dispatch: false }
  );

  confirmEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.confirmEmail),
      switchMap(({ token }) => {
        return this.http.confirmEmail(token).pipe(
          map(() => {
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
            return action.confirmEmailSuccess();
          }),
          catchError((error: HttpErrorResponse) => [
            action.confirmEmailFailed({ error }),
          ])
        );
      })
    )
  );

  confirmEmailFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(action.confirmEmailFailed),
        tap(({ error }) => {
          this.notificationFacade.sendErrorNotification(error.error);
        })
      ),
    { dispatch: false }
  );
}
