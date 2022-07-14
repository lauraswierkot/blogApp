import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as action from './article.actions';
import { ArticleForm } from './article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleFacade {
  constructor(private store: Store) {}

  public createArticle(articleForm: ArticleForm): void {
    this.store.dispatch(action.createArticle({ articleForm }));
  }
}
