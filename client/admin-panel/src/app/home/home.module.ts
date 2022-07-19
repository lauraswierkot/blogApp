import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  LoginFormComponent,
  AdminPanelComponent,
  RegisterFormComponent,
  ConfirmationPageComponent,
  ArticlesComponent
} from '.';
import { ArticleFormComponent } from './articles/article-form/article-form.component';

const modules = [FormsModule, ReactiveFormsModule, CommonModule];

const components = [
  LoginFormComponent,
  AdminPanelComponent,
  RegisterFormComponent,
  ConfirmationPageComponent,
  ArticlesComponent,
  ArticleFormComponent
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
})
export class HomeModule {}
