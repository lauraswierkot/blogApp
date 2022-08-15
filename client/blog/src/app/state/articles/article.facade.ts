import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as action from './article.actions';
import { Article, GetArticlePayload } from './article.model';
import * as selector from './article.selectors';

@Injectable({
  providedIn: 'root',
})
export class ArticleFacade {
  public articles$ = this.store.select(selector.selectArticleData);
  public articlesCount$ = this.store.select(selector.selectArticlesCount);
  public selectedArticle$ = this.store.select(selector.selectSelectedArticle);

  constructor(private store: Store) {}

  public getArticles(payload: GetArticlePayload): void {
    this.store.dispatch(action.getArticles({ payload }));
  }

  public selectArticle(slug: Article['slug']): void {
    this.store.dispatch(action.selectArticle({ slug }));
  }

  public resetArticle(): void {
    this.store.dispatch(action.resetArticle());
  }
}
