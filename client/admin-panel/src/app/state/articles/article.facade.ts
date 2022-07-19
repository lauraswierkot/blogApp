import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as action from './article.actions';

@Injectable({
  providedIn: 'root',
})
export class ArticleFacade {
  constructor(private store: Store) {}

  public createArticle(articleForm: FormData): void {
    this.store.dispatch(action.createArticle({ articleForm }));
  }
}
