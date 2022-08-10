import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { environment } from 'environments/environment';

import {
  Article,
  Comment,
  GetArticlePayload,
  GetArticlesCount,
} from '@state/articles/article.model';
import { User, UserLogin, UserRegister, UserResponse } from '@state/index';
import { GetUserPayload, GetUsersCount } from '@state/user/user.model';

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

  public getUsers(payload: GetUserPayload): Observable<GetUsersCount> {
    let params = {
      limit: payload.limit,
      page: payload.page,
      searchTerm: payload.searchTerm,
    };
    return this.http
      .get<GetUsersCount>(`${apiUrl}/users`, { params })
      .pipe(map((response) => response));
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

  public getArticles(payload: GetArticlePayload): Observable<GetArticlesCount> {
    let params = {
      limit: payload.limit,
      page: payload.page,
      searchTerm: payload.searchTerm,
    };
    return this.http
      .get<GetArticlesCount>(`${apiUrl}/articles`, {
        params,
      })
      .pipe(map((response) => response));
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

  public deleteComment(slug: string, id: number): Observable<Comment> {
    return this.http
      .delete<{ comment: Comment }>(`${apiUrl}/articles/${slug}/comments/${id}`)
      .pipe(map((response) => response.comment));
  }
}
