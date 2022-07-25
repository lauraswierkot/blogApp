import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

import * as action from './notification.actions';

@Injectable()
export class NotificationEffects {
  constructor(
    private actions$: Actions,
    public snackBar: MatSnackBar
  ) {}

  receivedErrorMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(action.receivedErrorMessage),
        tap(({ error }) => {
          if (typeof error.error.error == 'string') {
            this.snackBar.open(error.error.error, 'x');
          } else {
            error.error.error.forEach((element) => {
              this.snackBar.open(element, 'x', { horizontalPosition: 'end' });
            });
          }
        })
      ),
    { dispatch: false }
  );

  receivedSuccessMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(action.receivedSuccessMessage),
        tap(({ message }) => {
            this.snackBar.open(message.message, 'x');
        })
      ),
    { dispatch: false }
  );
}
