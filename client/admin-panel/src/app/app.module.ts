import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StateModule } from './state/state.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MaterialModule } from './material-module/material.module';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';

const modules = [
  BrowserModule,
  AppRoutingModule,
  StateModule,
  MaterialModule,
  ReactiveFormsModule,
  HttpClientModule
];

@NgModule({
  declarations: [AppComponent, LoginFormComponent],
  imports: [...modules],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
