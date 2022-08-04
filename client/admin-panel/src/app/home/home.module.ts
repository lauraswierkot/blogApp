import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

import {
  LoginFormComponent,
  AdminPanelComponent,
  RegisterFormComponent,
  ConfirmationPageComponent,
  ArticlesComponent,
  ArticleFormComponent,
  UpdateCommentDialogComponent,
} from '.';

import { MaterialModule } from 'app/material-module/material.module';
import { NewCommentDialogComponent } from './articles/new-comment-dialog/new-comment-dialog.component';

const modules = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  MaterialModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
  }),
];

const components = [
  LoginFormComponent,
  AdminPanelComponent,
  RegisterFormComponent,
  ConfirmationPageComponent,
  ArticlesComponent,
  ArticleFormComponent,
  UpdateCommentDialogComponent,
];

@NgModule({
  declarations: [...components, NewCommentDialogComponent],
  imports: [...modules],
  exports: [...components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
