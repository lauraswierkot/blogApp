import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from '@core/services/loader.service';

import { NotificationType } from '@state/notifications/notification.model';
import { NotificationFacade } from '@state/notifications/notification.facade';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isLoading: BehaviorSubject<boolean> = this.loaderService.isLoading;
  public title = 'admin-panel';
  public duration = 3000;
  public id: string;
  public snackBarRef: MatSnackBarRef<any>;

  constructor(
    private notificationFacade: NotificationFacade,
    private snackBar: MatSnackBar,
    private loaderService: LoaderService
  ) {}

  public ngOnInit(): void {
    this.notificationFacade.notifications$
      .pipe(untilDestroyed(this))
      .subscribe((notification) =>
        notification.forEach((element) => {
          this.snackBarRef = this.snackBar.open(element.message, 'x', {
            duration: this.duration,
            data: element.id,
            panelClass: [
              element.notificationType == NotificationType.Error
                ? 'mat__error'
                : 'mat__success',
            ],
          });
          this.snackBarRef
            .afterDismissed()
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.notificationFacade.removeNotification(this.id);
            });
          return (this.id = element.id);
        })
      );
  }
}
