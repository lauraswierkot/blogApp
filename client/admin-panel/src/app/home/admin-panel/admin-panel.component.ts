import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleFacade } from 'src/app/state/articles/article.facade';

import { UserFacade } from 'src/app/state/user/user.facade';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent {
  constructor(private userFacade: UserFacade, private router: Router, private facadeArticle: ArticleFacade) {}

  public logout(): void {
    this.userFacade.logout();
  }

  public createArticle(): void {
    this.router.navigate(['articles']);
  }

  public showAllArticles():void {
    this.router.navigate(['articles-list']) 
  }
}
