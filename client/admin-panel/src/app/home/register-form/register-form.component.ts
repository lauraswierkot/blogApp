import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  constructor(private router: Router) { }

  public toLoginForm(): void {
    this.router.navigate(['/login']);
  }

}
