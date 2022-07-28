import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationFacade } from '@state/notifications/notification.facade';
import { Subscription } from 'rxjs';

import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { NotificationType } from '@state/notifications/notification.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'admin-panel';
  public id: string;
  public subscription: Subscription;
  public snackBarRef: MatSnackBarRef<any>;

  constructor(
    private notificationFacade: NotificationFacade,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscription = this.notificationFacade.notifications$.subscribe(
      (value) =>
        value.forEach((element) => {
          this.snackBarRef = this.snackBar.open(element.message, 'x', {
            duration: 3000,
            data: element.id,
            panelClass: [
              element.notificationType == NotificationType.Error
                ? 'mat__error'
                : 'mat__success',
            ],
          });
          this.snackBarRef.afterDismissed().subscribe(() => {
            this.notificationFacade.removeNotification(this.id);
          });
          return (this.id = element.id);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
