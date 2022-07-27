import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as action from './notification.actions';
import * as selector from './notification.selectors';
import { Message, Error } from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationFacade {
  public error$ = this.store.select(selector.selectErrorData);
  public message$ = this.store.select(selector.selectMessageData);

  constructor(private store: Store) {}
  
  public sendErrorNotification(error: Error): void {
    this.store.dispatch(action.createErrorNotification({error}));
  }

  public resetErrorNotification() : void {
    this.store.dispatch(action.resetErrorNotification());
  }

  public sendSuccessNotification(message: Message): void {
    this.store.dispatch(action.createSuccessNotification({message}));
  }
}
