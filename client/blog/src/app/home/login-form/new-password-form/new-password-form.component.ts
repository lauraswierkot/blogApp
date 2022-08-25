import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserFacade } from '@state/user/user.facade';
import { UpdateUser } from '@state/user/user.model';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.scss'],
})
export class NewPasswordFormComponent implements OnInit {
  public passwordForm: FormGroup;
  public token: string = '';

  constructor(
    private facade: UserFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.passwordForm = new FormGroup({
      password: new FormControl('', {
        validators: Validators.email,
      }),
      confirmPassword: new FormControl('', {
        validators: Validators.required,
      }),
    });
  }

  public ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
  }

  public get password(): AbstractControl {
    return this.passwordForm.get('password');
  }

  public get confirmPassword(): AbstractControl {
    return this.passwordForm.get('confirmPassword');
  }

  public updatePassword(): void {
    const user: UpdateUser = {
      password: this.passwordForm.value.password,
    };
    this.facade.updatePassword(this.token, user);
  }

  public toLoginForm(): void {
    this.router.navigate(['/blog-login']);
  }
}
