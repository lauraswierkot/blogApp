import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StateModule } from './state/state.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MaterialModule } from './material-module/material.module';
import { HttpService } from './services/http.service';
import { UserFacade } from './state/user/user.facade';

const components = [AppComponent, LoginFormComponent];

const modules = [
  BrowserModule,
  AppRoutingModule,
  StateModule,
  MaterialModule,
  ReactiveFormsModule,
  HttpClientModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [HttpService, UserFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
