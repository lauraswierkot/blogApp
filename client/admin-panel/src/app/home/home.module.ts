import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserFacade } from '.';
import { LoginFormComponent } from '.';

const modules = [FormsModule, ReactiveFormsModule, CommonModule];

const components = [LoginFormComponent];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [UserFacade],
  exports: [...components],
})
export class HomeModule {}
