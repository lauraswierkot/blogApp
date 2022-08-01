import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';

import { UserFacade } from '@state/index';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  public topGap = 56;
  public bottomGap = 0;
  public modeOver: MatDrawerMode = 'over';
  public modeSide: MatDrawerMode = 'side';
  public mobileQuery: MediaQueryList;
  public _mobileQueryListener: () => void;

  constructor(
    private userFacade: UserFacade,
    private router: Router,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  }

  public toNewArticle(): void {
    this.router.navigate(['article']);
  }

  public logout(): void {
    this.userFacade.logout();
  }

  public toArticles(): void {
    this.router.navigate(['articles-panel']);
  }
}
