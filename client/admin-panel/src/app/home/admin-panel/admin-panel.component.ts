import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserFacade } from '@state/index';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent {
  constructor(private userFacade: UserFacade, private router: Router) {}

  public logout(): void {
    this.userFacade.logout();
  }

  public toArticles(): void {
    this.router.navigate(['articles-list']);
  }
}
