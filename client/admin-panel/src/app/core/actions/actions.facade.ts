import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';

import * as userActions from '@state/user/user.actions';
import * as articleActions from '@state/articles/article.actions';

import * as actionSelectors from './actions.selectors';

@Injectable({
  providedIn: 'root',
})
export class ActionsFacade {
  public globalLoaderActions: Action[] = [
    userActions.login,
    userActions.confirmEmail,
    userActions.register,
    articleActions.createArticle,
    articleActions.createArticleSuccess,
    articleActions.createArticleFailed,
    articleActions.deleteArticle,
    articleActions.updateArticle,
  ];
  public loading$ = this.store.select(
    actionSelectors.selectActionsPending(this.globalLoaderActions)
  );

  constructor(private store: Store) {}
}
