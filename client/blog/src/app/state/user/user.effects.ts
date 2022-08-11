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
}
