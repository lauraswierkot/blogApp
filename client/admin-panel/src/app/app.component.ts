import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationFacade } from '@state/notifications/notification.facade';
import { filter, Observable, Subscription } from 'rxjs';

import { Error } from '@state/notifications/notification.model';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  public title = 'admin-panel';
  public snackBarRef: any;
  constructor(
    private notificationFacade: NotificationFacade,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscription = this.notificationFacade.error$
      .pipe(
        filter((val) => {
          return val !== null;
        })
      )
      .subscribe(
        (value) =>
          (this.snackBarRef = this.snackBar.open(
            value.error.error.toString(),
            'x',
            { duration: 2500 }
          ))
      );
    this.snackBarRef.afterDismissed().subscribe(() => {
      this.notificationFacade.resetErrorNotification();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
