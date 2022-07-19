import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  LoginFormComponent,
  AdminPanelComponent,
  RegisterFormComponent,
  ConfirmationPageComponent,
} from './home';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'register',
    component: RegisterFormComponent,
  },
  {
    path: 'email-confirmation/:token',
    component: ConfirmationPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
