import { Action } from '@ngrx/store';

import { ActionsState } from './actions.model';

export function getActionName(actionType: string): string {
  if (typeof actionType !== 'string') {
    return null;
  }

  return actionType.split(' ').slice(0, -1).join(' ');
}

export function actionsReducer(
  state: ActionsState | undefined,
  action: Action & { error?: any }
): ActionsState {
  const { type } = action;
  const actionName = getActionName(type);

  if (!actionName) {
    return {
      ...state,
    };
  }

  if (type.endsWith(' Request')) {
    return {
      ...state,
      [actionName]: {
        pending: true,
        error: null,
      },
    };
  }

  if (type.endsWith(' Success') || type.endsWith(' Cancel')) {
    return {
      ...state,
      [actionName]: {
        pending: false,
        error: null,
      },
    };
  }

  if (type.endsWith(' Fail')) {
    return {
      ...state,
      [actionName]: {
        pending: false,
        error: action.error,
      },
    };
  }
  
  return {
    ...state,
  };
}
