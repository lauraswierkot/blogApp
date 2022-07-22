import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { MaterialModule } from 'app/material-module/material.module';

const modules = [FormsModule, ReactiveFormsModule, CommonModule, MaterialModule];

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
