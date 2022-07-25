import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as action from './notification.actions';
import { Message, Error } from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationFacade {
  constructor(private store: Store) {}
  
  public sendErrorMessage(error: Error): void {
    this.store.dispatch(action.receivedErrorMessage({error}));
  }

  public sendSuccessMessage(message: Message): void {
    this.store.dispatch(action.receivedSuccessMessage({message}));
  }
}
