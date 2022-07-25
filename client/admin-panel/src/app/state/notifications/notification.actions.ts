import { createAction, props } from "@ngrx/store";

import { Error, Message } from "./notification.model";

export const receivedErrorMessage = createAction(
  '[Notification] Received Error Message',
  props<{error: Error}>()
);

export const receivedSuccessMessage = createAction(
  '[Notification] Received Success Message',
  props<{message: Message}>()
);
