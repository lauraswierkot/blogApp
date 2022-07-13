import { Component } from '@angular/core';
import { UserFacade } from 'src/app/state/user/user.facade';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent {
  constructor(private facade: UserFacade) {}

  public logout(): void {
    this.facade.logout();
  }
}
