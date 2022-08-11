import { Component } from '@angular/core';
import { MatSnackBarRef, MatSnackBar } from '@angular/material/snack-bar';
import { ActionsFacade } from '@core/actions/actions.facade';
import { TranslateService } from '@ngx-translate/core';
import { NotificationFacade } from '@state/notifications/notification.facade';
import { delay, iif, mergeMap, Observable, of } from 'rxjs';

export enum LanguageTypeEnum {
  Polish = 'pl',
  English = 'en',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'blog';
  public languages = LanguageTypeEnum;
  public duration = 3000;
  public isLoading: Observable<boolean>;
  public id: string;
  public snackBarRef: MatSnackBarRef<any>;
  public isFirstEmittedValue = false;

  constructor(
    public translate: TranslateService,
    public notificationFacade: NotificationFacade,
    public snackBar: MatSnackBar,
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
}
