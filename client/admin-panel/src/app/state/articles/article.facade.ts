import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as action from './article.actions';
import * as selector from './article.selectors';


@Injectable({
  providedIn: 'root',
})
export class ArticleFacade {
  public articles$ = this.store.select(selector.selectArticleData);

  constructor(private store: Store) {}

  public createArticle(articleForm: FormData): void {
    this.store.dispatch(action.createArticle({ articleForm }));
  }

  public getArticles(): void {
    this.store.dispatch(action.getArticles());
  }
}
