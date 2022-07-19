import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import {
  Article,
  ArticleForm,
  ArticleResponse,
} from 'src/app/state/articles/article.model';

import { environment } from 'src/environments/environment';
import { User, UserLogin, UserRegister, UserResponse } from '../../state';

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

  public createArticle(articleForm: FormData): Observable<ArticleResponse> {
    return this.http
      .post<ArticleResponse>(`${apiUrl}/articles`, articleForm)
      .pipe(map((articleResponse) => articleResponse));
  }

  public getArticles(): Observable<ArticleResponse[]> {
    return this.http
      .get<{ articles: ArticleResponse[] }>(`${apiUrl}/articles`)
      .pipe(map((response) => response.articles));
  }
}
