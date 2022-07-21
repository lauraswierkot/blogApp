import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { environment } from 'environments/environment';

import { Article } from '@state/articles/article.model';
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

  public createArticle(articleForm: FormData): Observable<Article> {
    return this.http
      .post<{ article: Article }>(`${apiUrl}/articles`, articleForm)
      .pipe(map((articleResponse) => articleResponse.article));
  }

  public getArticles(): Observable<Article[]> {
    return this.http
      .get<{ articles: Article[] }>(`${apiUrl}/articles`)
      .pipe(map((response) => response.articles));
  }

  public deleteArticle(slug: string): Observable<Article> {
    return this.http
      .delete<{ article: Article }>(`${apiUrl}/articles/${slug}`)
      .pipe(map((response) => response.article));
  }

  public updateArticle(slug: string, articleForm: FormData): Observable<Article> {
    return this.http
      .put<{ article: Article }>(`${apiUrl}/articles/${slug}`, articleForm)
      .pipe(map((response) => response.article));
  }
}
