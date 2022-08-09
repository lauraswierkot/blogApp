import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as action from './article.actions';
import { Article, Comment } from './article.model';
import * as selector from './article.selectors';

@Injectable({
  providedIn: 'root',
})
export class ArticleFacade {
  public articles$ = this.store.select(selector.selectArticleData);
  public articlesCount$ = this.store.select(selector.selectArticlesCount);
  public selectedArticle$ = this.store.select(selector.selectSelectedArticle);
  public selectedArticleComments = this.store.select(
    selector.selectSelectedArticleComments
  );

  constructor(private store: Store) {}

  public createArticle(articleForm: FormData): void {
    this.store.dispatch(action.createArticle({ articleForm }));
  }

  public getArticles(limit: string, page: string, searchTerm: string = ''): void {
    this.store.dispatch(action.getArticles({ limit, page, searchTerm}));
  }

  public deleteArticle(slug: string): void {
    this.store.dispatch(action.deleteArticle({ slug }));
  }

  public updateArticle(slug: string, articleForm: FormData): void {
    this.store.dispatch(action.updateArticle({ slug, articleForm }));
  }

  public selectArticle(slug: Article['slug']): void {
    this.store.dispatch(action.selectArticle({ slug }));
  }

  public resetArticle(): void {
    this.store.dispatch(action.resetArticle());
  }

  public deleteComment(slug: Article['slug'], id: Comment['id']): void {
    this.store.dispatch(action.deleteComment({ slug, id }));
  }
}
