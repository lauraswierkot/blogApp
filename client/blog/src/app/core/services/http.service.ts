import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import {
  UpdateUser,
  User,
  UserLogin,
  UserResponse,
} from '@state/user/user.model';

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

  public sendReminderPasswordEmail(email: string): Observable<User> {
    return this.http
      .post<UserResponse>(`${apiUrl}/users/send`, { email: email })
      .pipe(map((userResponse) => userResponse.user));
  }

  public changePassword(token: string, user: UpdateUser): Observable<User> {
    return this.http
      .post<UserResponse>(`${apiUrl}/users/changePassword`, {
        reminderToken: token,
        user: user,
      })
      .pipe(map((userResponse) => userResponse.user));
  }
}
