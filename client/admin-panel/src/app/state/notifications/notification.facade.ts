import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as action from './notification.actions';
import { Message, Error } from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationFacade {
  constructor(private store: Store) {}
  
  public sendErrorNotification(error: Error['error']): void {
    this.store.dispatch(action.createErrorNotification({error}));
  }

  public sendSuccessNotification(message: Message['message']): void {
    this.store.dispatch(action.createSuccessNotification({message}));
  }
}
