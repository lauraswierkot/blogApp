import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

import { TranslateService } from '@ngx-translate/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay, iif, mergeMap, Observable, of } from 'rxjs';

import { NotificationType } from '@state/notifications/notification.model';
import { NotificationFacade } from '@state/notifications/notification.facade';
import { ActionsFacade } from '@core/actions/actions.facade';

export enum LanguageTypeEnum {
  Polish = 'pl',
  English = 'en',
}

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'blog';
  public languages = LanguageTypeEnum;
  public duration = 3000;
  public isLoading: Observable<boolean>;
  public id: string;
  public snackBarRef: MatSnackBarRef<any>;
  public isFirstEmittedValue = false;

  constructor(
    public translate: TranslateService,
    private notificationFacade: NotificationFacade,
    private snackBar: MatSnackBar,
    private actionsFacade: ActionsFacade
  ) {
    translate.setDefaultLang('en');
    this.isLoading = this.actionsFacade.loading$.pipe(
      mergeMap((value) => {
        if (!this.isFirstEmittedValue) {
          this.isFirstEmittedValue = !this.isFirstEmittedValue;
          return of(value);
        }
        if (this.isFirstEmittedValue) {
          return iif(() => !!value, of(value), of(false).pipe(delay(500)));
        }
        return of(value);
      })
    );
  }

  public setLang(language: string): void {
    this.translate.use(language);
  }

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
