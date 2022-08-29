import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatSidenav, MatDrawerMode } from '@angular/material/sidenav';

import { TranslateService } from '@ngx-translate/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay, iif, mergeMap, Observable, of } from 'rxjs';

import { NotificationType } from '@state/notifications/notification.model';
import { NotificationFacade } from '@state/notifications/notification.facade';
import { ActionsFacade } from '@core/actions/actions.facade';
import { UserFacade } from './state';

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
  @ViewChild('sidenav') sidenav: MatSidenav;
  public topGap = 56;
  public bottomGap = 0;
  public modeOver: MatDrawerMode = 'over';
  public modeSide: MatDrawerMode = 'side';
  public mobileQuery: MediaQueryList;
  public _mobileQueryListener: () => void;
  
  public languages = LanguageTypeEnum;
  public title = 'admin-panel';
  public duration = 3000;
  public isLoading: Observable<boolean>;
  public id: string;
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar>;
  public isFirstEmittedValue = false;
  public user$ = this.userFacade.user$;

  constructor(
    public translate: TranslateService,
    private notificationFacade: NotificationFacade,
    private snackBar: MatSnackBar,
    private actionsFacade: ActionsFacade,
    private userFacade: UserFacade,
    private router: Router,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher
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
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
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

  public toNewArticle(): void {
    this.router.navigate(['article']);
  }

  public logout(): void {
    this.userFacade.logout();
  }

  public toArticles(): void {
    this.router.navigate(['']);
  }

  public toUsers(): void {
    this.router.navigate(['users-panel']);
  }
}
