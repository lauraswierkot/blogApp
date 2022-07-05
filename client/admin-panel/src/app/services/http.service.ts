import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { AuthResponse, Login } from '../state/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  login(credentials: Login): Observable<{ user: AuthResponse }> {
    //for later usage when server working
    // return this.http.post<{ user: AuthResponse }>('', { credentials });
    let authResponse: AuthResponse = {
      email: credentials.email,
    } as AuthResponse;
    return of({ user: authResponse });
  }
}
