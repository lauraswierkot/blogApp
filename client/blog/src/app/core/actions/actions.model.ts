export interface ActionState {
  pending: boolean;
  error: any;
}

export interface ActionsState {
  [actionName: string]: ActionState;
}

export const actionsFeatureKey = 'actions';
