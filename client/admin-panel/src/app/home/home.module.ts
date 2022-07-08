import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginFormComponent } from '.';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const modules = [FormsModule, ReactiveFormsModule, CommonModule];

const components = [LoginFormComponent, AdminPanelComponent];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
})
export class HomeModule {}
