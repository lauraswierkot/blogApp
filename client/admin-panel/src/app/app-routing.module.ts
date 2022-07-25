import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  LoginFormComponent,
  AdminPanelComponent,
  RegisterFormComponent,
  ConfirmationPageComponent,
  ArticleFormComponent,
  ArticlesComponent
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
  {
    path: 'article',
    component: ArticleFormComponent
  },
  {
    path: 'articles-panel',
    component: ArticlesComponent
  },
  {
    path: 'article/:slug',
    component: ArticleFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
