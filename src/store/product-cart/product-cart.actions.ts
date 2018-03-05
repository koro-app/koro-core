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
  constructor(public payload: any, public quantity: number) { }
}

export class AddSuccessAction implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: any, public quantity: number) { }
}

export class AddFailAction implements Action {
  readonly type = ADD_FAIL;

  constructor(public payload: any, public quantity: number) { }
}

// INCREASE PRODUCT

export const INCREASE =                 '[Product Cart] Increase';
export const INCREASE_SUCCESS =         '[Product Cart] Increase Success';
export const INCREASE_FAIL =            '[Product Cart] Increase Fail';

export class IncreaseAction implements Action {
  readonly type = INCREASE;
  constructor(public payload: any, public quantity: number) { }
}

export class IncreaseSuccessAction implements Action {
  readonly type = INCREASE_SUCCESS;

  constructor(public payload: any, public quantity: number) { }
}

export class IncreaseFailAction implements Action {
  readonly type = INCREASE_FAIL;

  constructor(public payload: any, public quantity: number) { }
}

// DECREASE PRODUCT

export const DECREASE =                 '[Product Cart] Decrease';
export const DECREASE_SUCCESS =         '[Product Cart] Decrease Success';
export const DECREASE_FAIL =            '[Product Cart] Decrease Fail';

export class DecreaseAction implements Action {
  readonly type = DECREASE;
  constructor(public payload: any, public quantity: number) { }
}

export class DecreaseSuccessAction implements Action {
  readonly type = DECREASE_SUCCESS;

  constructor(public payload: any, public quantity: number) { }
}

export class DecreaseFailAction implements Action {
  readonly type = DECREASE_FAIL;

  constructor(public payload: any, public quantity: number) { }
}

// SELECTED PRODUCT

export const SELECTED =                 '[Product Cart] Selected';

export class SelectedAction implements Action {
  readonly type = SELECTED;
  constructor(public payload: any,public value: boolean) { }
}

// SET NEW PRODUCT

export const SET_NEW_CART =                 '[Product Cart] Set new cart';

export class SetNewCart implements Action {
  readonly type = SET_NEW_CART;
  constructor(public payload: any) { }
}

// SELECTED All PRODUCT

export const SELECTED_ALL =                 '[Product Cart] Selected All';

export class SelectedAllAction implements Action {
  readonly type = SELECTED_ALL;
  constructor(public payload: boolean) { }
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
export const REMOVE_ALL_SUCCESS =         '[Product Cart] Remove All Success';
export const REMOVE_ALL_FAIL =            '[Product Cart] Remove All Fail';

export class RemoveAllAction implements Action {
  readonly type = REMOVE_ALL;
  constructor() { }
}

export class RemoveAllSuccessAction implements Action {
  readonly type = REMOVE_ALL_SUCCESS;

  constructor() { }
}

export class RemoveAllFailAction implements Action {
  readonly type = REMOVE_ALL_FAIL;

  constructor() { }
}

// REMOVE PRODUCT CHECKOUT SUCCESS

export const REMOVE_ITEM_CHECKOUT =                 '[Product Cart] Remove Item Checkout';

export class RemoveItemCheckout implements Action {
  readonly type = REMOVE_ITEM_CHECKOUT;
  constructor(public payload: any) { }
}

export type Actions =
  | GetProductsAction
  | GetProductsSuccessAction
  | GetProductsFailAction
  | AddAction
  | AddSuccessAction
  | AddFailAction
  | SetNewCart
  | IncreaseAction
  | IncreaseSuccessAction
  | IncreaseFailAction
  | DecreaseAction
  | DecreaseSuccessAction
  | DecreaseFailAction
  | SelectedAction
  | SelectedAllAction
  | RemoveAction
  | RemoveSuccessAction
  | RemoveFailAction
  | RemoveAllAction
  | RemoveAllSuccessAction
  | RemoveAllFailAction
  | RemoveItemCheckout


