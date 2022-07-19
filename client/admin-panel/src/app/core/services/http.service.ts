import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { User, UserLogin, UserRegister, UserResponse } from '@state/index';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public login(loginForm: UserLogin): Observable<User> {
    return this.http
      .post<UserResponse>(`${apiUrl}/users/login`, { user: loginForm })
      .pipe(map((userResponse) => userResponse.user));
  }

  public register(registerForm: UserRegister): Observable<User> {
    return this.http
      .post<UserResponse>(`${apiUrl}/users/register`, registerForm)
      .pipe(map((userResponse) => userResponse.user));
  }

  public confirmEmail(token: string): Observable<User> {
    return this.http
      .post<UserResponse>(`${apiUrl}/users/confirm`, { confirmToken: token })
      .pipe(map((userResponse) => userResponse.user));
  }
}
