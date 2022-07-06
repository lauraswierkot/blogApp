import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpService } from '.';

@NgModule({
  imports: [CommonModule],
  providers: [HttpService],
})
export class CoreModule {}
