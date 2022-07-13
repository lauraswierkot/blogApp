import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFacade } from 'src/app/state/user/user.facade';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss'],
})
export class ConfirmationPageComponent {
  public token: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private facade: UserFacade
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (routerValues) => (this.token = routerValues['token'])
    );
  }

  public toLoginForm(): void {
    this.facade.confirmEmail(this.token);
    this.router.navigate(['/login']);
  }
}
