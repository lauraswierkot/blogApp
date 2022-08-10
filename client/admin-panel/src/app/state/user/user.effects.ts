import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, switchMap, tap } from 'rxjs';
import { map } from 'rxjs';

import * as action from './user.actions';
import * as notificationAction from '@state/notifications/notification.actions';
import { HttpService } from '@core/index';
import { User } from './user.model';
import { NotificationType } from '@state/notifications/notification.model';

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
          switchMap((loginResponse: User) => {
            this.router.navigate(['']);
            return [
              action.loginSuccess({ loginResponse }),
              notificationAction.createNotification({
                message: "{{'notification.userLoggedIn' | translate}}",
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

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.register),
      switchMap(({ registerForm }) => {
        return this.http.register(registerForm).pipe(
          switchMap((registerResponse: User) => {
            this.router.navigate(['/login']);
            return [
              notificationAction.createNotification({
                message: "{{'notification.userRegistered' | translate}}",
                notificationType: NotificationType.Message,
              }),
              action.registerSuccess({ registerResponse }),
            ];
          }),
          catchError((error: HttpErrorResponse) => [
            action.registerFailed(error),
            notificationAction.createNotification({
              message: error.error.error,
              notificationType: NotificationType.Error,
            }),
          ])
        );
      })
    )
  );

  confirmEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.confirmEmail),
      switchMap(({ token }) => {
        return this.http.confirmEmail(token).pipe(
          switchMap(() => {
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
            return [
              notificationAction.createNotification({
                message: "{{'notification.emailConfirmed' | translate}}",
                notificationType: NotificationType.Message,
              }),
              action.confirmEmailSuccess(),
            ];
          }),
          catchError((error: HttpErrorResponse) => [
            action.confirmEmailFailed(error),
            notificationAction.createNotification({
              message: error.error.error,
              notificationType: NotificationType.Error,
            }),
          ])
        );
      })
    )
  );

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.getUsers),
      switchMap(({ payload }) => {
        return this.http.getUsers(payload).pipe(
          switchMap((response) => {
            return [
              action.getUsersSuccess({ users: response.users }),
              action.setUsersCount({ usersCount: response.total }),
            ];
          }),
          catchError((error: HttpErrorResponse) => [
            action.getUsersFailed(error),
            notificationAction.createNotification({
              message: error.error.error,
              notificationType: NotificationType.Error,
            }),
          ])
        );
      })
    )
  );

  selectUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.selectUser),
      switchMap(({ username }) => {
        return this.http.getUser(username).pipe(
          map((user: User) => {
            return action.selectUserSuccess({ user });
          }),
          catchError((error: HttpErrorResponse) => [
            action.selectUserFailed(error),
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
