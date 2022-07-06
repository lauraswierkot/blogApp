import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserLogin } from '../state/user/user.model';

const apiUrl = '';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public login(loginForm: UserLogin): Observable<User> {
    return this.http.post<User>(apiUrl, loginForm);
  }
}
