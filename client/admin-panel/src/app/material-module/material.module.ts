import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const modules = [MatFormFieldModule, MatIconModule, MatSnackBarModule];

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [...modules],
})
export class MaterialModule {}
