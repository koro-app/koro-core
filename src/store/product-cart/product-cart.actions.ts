import { Action } from '@ngrx/store';

// GET PRODUCTS

export const GET_PRODUCTS =                 '[Product Cart] GetProducts';
export const GET_PRODUCTS_SUCCESS =         '[Product Cart] GetProducts Success';
export const GET_PRODUCTS_FAIL =            '[Product Cart] GetProducts Fail';

export class GetProductsAction implements Action {
  readonly type = GET_PRODUCTS;
}

export class GetProductsSuccessAction implements Action {
  readonly type = GET_PRODUCTS_SUCCESS;

  constructor(public payload: any) { }
}

export class GetProductsFailAction implements Action {
  readonly type = GET_PRODUCTS_FAIL;

  constructor(public payload: any) { }
}

// ADD PRODUCT

export const ADD =                 '[Product Cart] Add';
export const ADD_SUCCESS =         '[Product Cart] Add Success';
export const ADD_FAIL =            '[Product Cart] Add Fail';

export class AddAction implements Action {
  readonly type = ADD;
  constructor(public payload: any) { }
}

export class AddSuccessAction implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: any) { }
}

export class AddFailAction implements Action {
  readonly type = ADD_FAIL;

  constructor(public payload: any) { }
}

// INCREASE PRODUCT

export const INCREASE =                 '[Product Cart] Increase';
export const INCREASE_SUCCESS =         '[Product Cart] Increase Success';
export const INCREASE_FAIL =            '[Product Cart] Increase Fail';

export class IncreaseAction implements Action {
  readonly type = INCREASE;
  constructor(public payload: any) { }
}

export class IncreaseSuccessAction implements Action {
  readonly type = INCREASE_SUCCESS;

  constructor(public payload: any) { }
}

export class IncreaseFailAction implements Action {
  readonly type = INCREASE_FAIL;

  constructor(public payload: any) { }
}

// DECREASE PRODUCT

export const DECREASE =                 '[Product Cart] Decrease';
export const DECREASE_SUCCESS =         '[Product Cart] Decrease Success';
export const DECREASE_FAIL =            '[Product Cart] Decrease Fail';

export class DecreaseAction implements Action {
  readonly type = DECREASE;
  constructor(public payload: any) { }
}

export class DecreaseSuccessAction implements Action {
  readonly type = DECREASE_SUCCESS;

  constructor(public payload: any) { }
}

export class DecreaseFailAction implements Action {
  readonly type = DECREASE_FAIL;

  constructor(public payload: any) { }
}

// REMOVE PRODUCT

export const REMOVE =                 '[Product Cart] Remove';
export const REMOVE_SUCCESS =         '[Product Cart] Remove Success';
export const REMOVE_FAIL =            '[Product Cart] Remove Fail';

export class RemoveAction implements Action {
  readonly type = REMOVE;
  constructor(public payload: any) { }
}

export class RemoveSuccessAction implements Action {
  readonly type = REMOVE_SUCCESS;

  constructor(public payload: any) { }
}

export class RemoveFailAction implements Action {
  readonly type = REMOVE_FAIL;

  constructor(public payload: any) { }
}

// REMOVE ALL PRODUCT

export const REMOVE_ALL =                 '[Product Cart] Remove All';

export class RemoveAllAction implements Action {
  readonly type = REMOVE_ALL;
  constructor() { }
}

export type Actions =
  | GetProductsAction
  | GetProductsSuccessAction
  | GetProductsFailAction
  | AddAction
  | AddSuccessAction
  | AddFailAction
  | IncreaseAction
  | IncreaseSuccessAction
  | IncreaseFailAction
  | DecreaseAction
  | DecreaseSuccessAction
  | DecreaseFailAction
  | RemoveAction
  | RemoveSuccessAction
  | RemoveFailAction
  | RemoveAllAction



