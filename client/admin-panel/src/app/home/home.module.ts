import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  LoginFormComponent,
  AdminPanelComponent,
  RegisterFormComponent,
  ConfirmationPageComponent,
} from '.';

const modules = [FormsModule, ReactiveFormsModule, CommonModule];

const components = [
  LoginFormComponent,
  AdminPanelComponent,
  RegisterFormComponent,
  ConfirmationPageComponent,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
})
export class HomeModule {}
