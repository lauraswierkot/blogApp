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
  public selectedArticles$ = this.store.select(selector.selectSelectedArticle);
  public selectedArticleComments = this.store.select(selector.selectSelectedArticleComments); 

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

  public selectArticle(article: Article): void {
    this.store.dispatch(action.selectArticle({ article }));
  }

  public resetArticle(): void {
    this.store.dispatch(action.resetArticle());
  }
}
