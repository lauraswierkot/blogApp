import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

const modules = [
  MatFormFieldModule,
  MatIconModule,
  MatSnackBarModule,
  MatChipsModule,
  MatCardModule,
  MatSelectModule,
  MatSidenavModule,
  MatButtonModule,
  MatListModule,
  MatToolbarModule,
  MatBadgeModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatSidenavModule
];

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [...modules],
})
export class MaterialModule {}
