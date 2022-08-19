import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailFormComponent } from '@home/login-form/email-form/email-form.component';

import {
  ArticleComponent,
  ArticlesComponent,
  LoginFormComponent,
  NewPasswordFormComponent,
} from './home';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
  },
  {
    path: 'article/:slug',
    component: ArticleComponent,
  },
  {
    path: 'blog-login',
    component: LoginFormComponent,
  },
  {
    path: 'password-reset/:token',
    component: NewPasswordFormComponent,
  },
  {
    path: 'email-form',
    component: EmailFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
