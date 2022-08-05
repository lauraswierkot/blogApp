import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { environment } from 'environments/environment';

import { Article, Comment } from '@state/articles/article.model';
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

  public getUsers(searchTerm: string): Observable<User[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http
      .get<{ users: User[] }>(`${apiUrl}/users`, { params })
      .pipe(map((response) => response.users));
  }

  public getUser(username: string): Observable<User> {
    return this.http
      .get<{ profile: User }>(`${apiUrl}/profiles/${username}`)
      .pipe(map((response) => response.profile));
  }

  public createArticle(articleForm: FormData): Observable<Article> {
    return this.http
      .post<{ article: Article }>(`${apiUrl}/articles`, articleForm)
      .pipe(map((articleResponse) => articleResponse.article));
  }

  public getArticles(searchTerm: string): Observable<Article[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http
      .get<{ articles: Article[] }>(`${apiUrl}/articles`, { params })
      .pipe(map((response) => response.articles));
  }

  public getArticle(slug: string): Observable<Article> {
    return this.http
      .get<{ article: Article }>(`${apiUrl}/articles/${slug}`)
      .pipe(map((response) => response.article));
  }

  public deleteArticle(slug: string): Observable<Article> {
    return this.http
      .delete<{ article: Article }>(`${apiUrl}/articles/${slug}`)
      .pipe(map((response) => response.article));
  }

  public updateArticle(
    slug: string,
    articleForm: FormData
  ): Observable<Article> {
    return this.http
      .put<{ article: Article }>(`${apiUrl}/articles/${slug}`, articleForm)
      .pipe(map((response) => response.article));
  }

  public createComment(slug: string, body: string): Observable<Comment> {
    return this.http
      .post<{ comment: Comment }>(`${apiUrl}/articles/${slug}/comments`, {
        comment: { body: body },
      })
      .pipe(map((response) => response.comment));
  }

  public updateComment(
    slug: string,
    body: string,
    id: number
  ): Observable<Comment> {
    return this.http
      .put<{ comment: Comment }>(`${apiUrl}/articles/${slug}/comments/${id}`, {
        comment: { body: body },
      })
      .pipe(map((response) => response.comment));
  }

  public deleteComment(slug: string, id: number): Observable<Comment> {
    return this.http
      .delete<{ comment: Comment }>(`${apiUrl}/articles/${slug}/comments/${id}`)
      .pipe(map((response) => response.comment));
  }
}
