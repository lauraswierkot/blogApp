import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserFacade } from '@state/index';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss'],
})
export class ConfirmationPageComponent implements OnInit {
  public token: string = '';

  constructor(
    private route: ActivatedRoute,
    private facade: UserFacade
  ) {}

  public ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
  }

  public toLoginForm(): void {
    this.facade.confirmEmail(this.token);
  }
}
