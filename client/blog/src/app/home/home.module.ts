import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MaterialModule } from 'app/material-module/material/material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  LoginFormComponent,
  NewPasswordFormComponent,
  EmailFormComponent,
  ArticlesComponent,
  ArticleComponent,
} from './';
import { RouterModule } from '@angular/router';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

const modules = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  MaterialModule,
  RouterModule,
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
  NewPasswordFormComponent,
  EmailFormComponent,
  ArticlesComponent,
  ArticleComponent,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
