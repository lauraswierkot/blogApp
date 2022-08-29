import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  LoginFormComponent,
  RegisterFormComponent,
  ConfirmationPageComponent,
  ArticleFormComponent,
  ArticlesComponent,
  UsersComponent,
} from './home';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
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
  {
    path: 'article',
    component: ArticleFormComponent,
  },
  
  {
    path: 'article/:slug',
    component: ArticleFormComponent,
  },
  {
    path: 'users-panel',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
