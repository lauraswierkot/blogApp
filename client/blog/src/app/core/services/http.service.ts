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
import {
  GetArticlePayload,
  GetArticlesCount,
  Article,
  Comment,
} from '@state/articles/article.model';

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

  public createComment(
    slug: Article['slug'],
    body: Comment['body']
  ): Observable<Comment> {
    return this.http
      .post<{ comment: Comment }>(`${apiUrl}/articles/${slug}/comments`, {
        comment: { body },
      })
      .pipe(map((response) => response.comment));
  }

  public updateComment(
    slug: Article['slug'],
    body: Comment['body'],
    id: Comment['id']
  ): Observable<Comment> {
    return this.http
      .put<{ comment: Comment }>(`${apiUrl}/articles/${slug}/comments/${id}`, {
        comment: { body },
      })
      .pipe(map((response) => response.comment));
  }

  public deleteComment(
    slug: Article['slug'],
    id: Comment['id']
  ): Observable<Comment> {
    return this.http
      .delete<{ comment: Comment }>(`${apiUrl}/articles/${slug}/comments/${id}`)
      .pipe(map((response) => response.comment));
  }
}
