import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';

import * as userActions from '@state/user/user.actions';
import * as actionSelectors from './actions.selectors';

@Injectable({
  providedIn: 'root',
})
export class ActionsFacade {
  public globalLoaderActions: Action[] = [userActions.login];
  public loading$ = this.store.select(
    actionSelectors.selectActionsPending(this.globalLoaderActions)
  );

  constructor(private store: Store) {}
}
