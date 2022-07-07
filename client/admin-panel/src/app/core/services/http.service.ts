import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserLogin, UserResponse } from '../../state/user/user.model';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public login(loginForm: UserLogin): Observable<User> {
    const headers = new HttpHeaders({});
    return this.http
      .post<UserResponse>(
        `${apiUrl}/users/login`,
        { user: loginForm },
        { headers: headers }
      )
      .pipe(map((userResponse) => userResponse.user));
  }
}
