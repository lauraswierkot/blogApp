import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, switchMap, tap } from 'rxjs';

import * as action from './user.actions';
import * as notificationAction from '@state/notifications/notification.actions';
import { HttpService } from '@core/index';
import { User } from './user.model';
import { NotificationType } from '@state/notifications/notification.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private http: HttpService,
    private router: Router,
    private translate: TranslateService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.login),
      switchMap(({ loginForm }) => {
        return this.http.login(loginForm).pipe(
          switchMap((loginResponse: User) => {
            this.router.navigate(['']);
            return [
              action.loginSuccess({ loginResponse }),
              notificationAction.createNotification({
                message: this.translate.instant('notification.userLoggedIn'),
                notificationType: NotificationType.Message,
              }),
            ];
          }),
          catchError((error: HttpErrorResponse) => [
            action.loginFailed(error),
            notificationAction.createNotification({
              message: error.error.error,
              notificationType: NotificationType.Error,
            }),
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

  sendEmailReminderPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.sendReminderPasswordEmail),
      switchMap(({ email }) => {
        return this.http.sendReminderPasswordEmail(email).pipe(
          switchMap(() => {
            setTimeout(() => {
              this.router.navigate(['/blog-login']);
            }, 1000);
            return [
              notificationAction.createNotification({
                message: this.translate.instant('notification.reminderSent'),
                notificationType: NotificationType.Message,
              }),
              action.sendReminderPasswordEmailSuccess(),
            ];
          }),
          catchError((error: HttpErrorResponse) => [
            action.sendReminderPasswordEmailFailed(error),
            notificationAction.createNotification({
              message: error.error.error,
              notificationType: NotificationType.Error,
            }),
          ])
        );
      })
    )
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.changePassword),
      switchMap(({ token, user }) => {
        return this.http.changePassword(token, user).pipe(
          switchMap(() => {
            this.router.navigate(['/blog-login']);
            return [
              notificationAction.createNotification({
                message: this.translate.instant('notification.passwordChanged'),
                notificationType: NotificationType.Message,
              }),
              action.changePasswordSuccess(),
            ];
          }),
          catchError((error: HttpErrorResponse) => [
            action.changePasswordFailed(error),
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
