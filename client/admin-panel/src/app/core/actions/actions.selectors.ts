import { createFeatureSelector, createSelector, Action } from '@ngrx/store';

import { ActionsState, actionsFeatureKey, ActionState } from './actions.model';
import { getActionName } from './actions.reducer';

export const selectActionsState = createFeatureSelector<ActionsState>(
  actionsFeatureKey
);

// export const selectActionState = (action: Action) => createSelector(
//   selectActionsState,
//   actions => {
//     const actionName = getActionName(action.type);
//     return actions[actionName];
//   }
// );

// export const selectActionPending = (action: Action) => createSelector(
//   selectActionsState,
//   actions => {
//     const actionName = getActionName(action.type);
//     return actions[actionName]?.pending ?? undefined;
//   }
// );

// export const selectActionErrorState = (action: Action) => createSelector(
//   selectActionsState,
//   (actions: ActionsState): any | undefined => {
//     const actionName = getActionName(action.type);
//     return actions[actionName]?.error ?? undefined;
//   }
// );

export const selectActionsPending = (actions: Action[]) => createSelector(
  selectActionsState,
  (actionsState: ActionsState): boolean | undefined => {
    return actions.some(action => {
      const actionName = getActionName(action.type);
      return actionsState[actionName]?.pending;
    });
  }
);