import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserFacade } from '@state/user/user.facade';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
})
export class EmailFormComponent {
  public emailForm: FormGroup;
  public token: string = '';

  constructor(
    private facade: UserFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.emailForm = new FormGroup({
      email: new FormControl('', {
        validators: Validators.required,
      }),
    });
  }

  public get email(): AbstractControl {
    return this.emailForm.get('email');
  }

  public sendReminder(): void {
    const email = this.emailForm.value.email;
    this.facade.sendReminderEmailPassword(email);
  }

  public toLoginForm(): void {
    this.router.navigate(['/blog-login']);
  }
}
