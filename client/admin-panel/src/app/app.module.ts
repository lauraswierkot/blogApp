import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StateModule } from './state/state.module';
import { MaterialModule } from './material-module/material.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

const modules = [
  CommonModule,
  BrowserModule,
  AppRoutingModule,
  StateModule,
  MaterialModule,
  HttpClientModule,
  CoreModule,
  HomeModule,
  BrowserAnimationsModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [...modules],
  providers: [],
  exports: [AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
