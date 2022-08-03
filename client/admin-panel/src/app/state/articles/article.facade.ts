import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as action from './article.actions';
import { Article } from './article.model';
import * as selector from './article.selectors';

@Injectable({
  providedIn: 'root',
})
export class ArticleFacade {
  public articles$ = this.store.select(selector.selectArticleData);
  public selectedArticle$ = this.store.select(selector.selectSelectedArticle);
  public selectedArticleComments = this.store.select(
    selector.selectSelectedArticleComments
  );

  constructor(private store: Store) {}

  public createArticle(articleForm: FormData): void {
    this.store.dispatch(action.createArticle({ articleForm }));
  }

  public getArticles(searchTerm: string = ''): void {
    this.store.dispatch(action.getArticles({ searchTerm }));
  }

  public deleteArticle(slug: string): void {
    this.store.dispatch(action.deleteArticle({ slug }));
  }

  public updateArticle(slug: string, articleForm: FormData): void {
    this.store.dispatch(action.updateArticle({ slug, articleForm }));
  }

  public selectArticle(slug: string): void {
    this.store.dispatch(action.selectArticle({ slug }));
  }

  public resetArticle(): void {
    this.store.dispatch(action.resetArticle());
  }

  public createComment(slug: string, body: string): void {
    this.store.dispatch(action.createComment({ slug, body }));
  }

  public updateComment(slug: string, body: string, id: number): void {
    this.store.dispatch(action.updateComment({ slug, body, id }));
  }

  public deleteComment(slug: string, id: number): void {
    this.store.dispatch(action.deleteComment({ slug, id }));
  }
}
