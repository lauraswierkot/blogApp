import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as action from './notification.actions';
import * as selector from './notification.selectors';

import { Notification } from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationFacade {
  public notifications$ = this.store.select(selector.selectNotifications);

  constructor(private store: Store) {}

  public sendNotification(notification: Notification): void {
    this.store.dispatch(action.createNotification({ notification }));
  }

  public removeNotification(id: string): void {
    this.store.dispatch(action.removeNotification({ id }));
  }
}
