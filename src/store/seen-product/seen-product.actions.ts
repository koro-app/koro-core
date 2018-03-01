import { Action } from '@ngrx/store';

// GET ALL SEEN PRODUCT
export const GET_ALL = '[Product Seen] Get All';
export const GET_ALL_SUCCESS = '[Product Seen] Get All Success';
export const GET_ALL_FAILED =  '[Product Seen] Get All failed';

export class GetAllSeenAction implements Action {
  readonly type = GET_ALL;
  constructor() { }
}

export class GetAllSeenSuccessAction implements Action {
  readonly type = GET_ALL_SUCCESS;
  constructor(public payload: any) { }
}

export class GetAllSeenFailedAction implements Action {
  readonly type = GET_ALL_FAILED;
  constructor(public payload: any) { }
}

// ADD SEEN PRODUCT
export const ADD_SEEN = '[Product Seen] Add';
export const ADD_SEEN_SUCCESS = '[Product Seen] Add Success';
export const ADD_SEEN_FAILED =  '[Product Seen] Add failed';

export class AddSeenAction implements Action {
  readonly type = ADD_SEEN;
  constructor(public payload: any) { }
}

export class AddSeenSuccessAction implements Action {
  readonly type = ADD_SEEN_SUCCESS;
  constructor(public payload: any) { }
}

export class AddSeenFailedAction implements Action {
  readonly type = ADD_SEEN_FAILED;
  constructor(public payload: any) { }
}

export type Actions =
  | AddSeenAction
  | AddSeenSuccessAction
  | AddSeenFailedAction
  | GetAllSeenAction
  | GetAllSeenSuccessAction
  | GetAllSeenFailedAction