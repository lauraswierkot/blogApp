import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StateModule } from './state/state.module';
import { MaterialModule } from './material-module/material.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';

const components = [AppComponent];

const modules = [
  BrowserModule,
  AppRoutingModule,
  StateModule,
  MaterialModule,
  HttpClientModule,
  CoreModule,
  HomeModule
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
