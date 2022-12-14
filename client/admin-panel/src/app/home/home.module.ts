import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CustomMatPaginatorIntl } from './services/custom-paginator.provider';
import { MaterialModule } from '../material-module/material.module';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

import {
  LoginFormComponent,
  RegisterFormComponent,
  ConfirmationPageComponent,
  ArticlesComponent,
  ArticleFormComponent,
  UsersComponent,
  UserDialogComponent,
} from '.';

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
  RegisterFormComponent,
  ConfirmationPageComponent,
  ArticlesComponent,
  ArticleFormComponent,
  UsersComponent,
  UserDialogComponent,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
})
export class HomeModule {}
