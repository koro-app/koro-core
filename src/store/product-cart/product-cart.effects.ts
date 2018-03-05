import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ProductCartService } from './product-cart.service';
import * as productCart from './product-cart.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ProductCartEffects {
  constructor(
    private productCartService: ProductCartService,
    private actions$: Actions
  ) { }

  @Effect() getAll$ = this.actions$
  .ofType(productCart.GET_PRODUCTS)
  .switchMap((action:any) => this.productCartService.getAll()
    // If successful, dispatch success action with result
    .map(res => ({ type: productCart.GET_PRODUCTS_SUCCESS, payload: res }))
    // If request fails, dispatch failed action
    .catch(() => Observable.of({ type: productCart.GET_PRODUCTS_FAIL}))
  );

  @Effect() add$ = this.actions$
  .ofType(productCart.ADD)
  .switchMap((action:any) => this.productCartService.addCart(action.payload, action.quantity)
    // If successful, dispatch success action with result
    .map(res => ({ type: productCart.ADD_SUCCESS, payload: res.product,quantity:res.quantity }))
    // If request fails, dispatch failed action
    .catch(() => Observable.of({ type: productCart.ADD_FAIL}))
  );

  @Effect() increase$ = this.actions$
  .ofType(productCart.INCREASE)
  .switchMap((action:any) => this.productCartService.increaseCart(action.payload, action.quantity)
    // If successful, dispatch success action with result
    .map(res => ({ type: productCart.INCREASE_SUCCESS, payload: res.product,quantity:res.quantity }))
    // If request fails, dispatch failed action
    .catch(() => Observable.of({ type: productCart.INCREASE_FAIL}))
  );

  @Effect() decrease$ = this.actions$
  .ofType(productCart.DECREASE)
  .switchMap((action:any) => this.productCartService.decreaseCart(action.payload, action.quantity)
    // If successful, dispatch success action with result
    .map(res => ({ type: productCart.DECREASE_SUCCESS, payload: res.product,quantity:res.quantity }))
    // If request fails, dispatch failed action
    .catch(() => Observable.of({ type: productCart.DECREASE_FAIL}))
  );

  @Effect() remove$ = this.actions$
  .ofType(productCart.REMOVE)
  .switchMap((action:any) => this.productCartService.removeCart(action.payload)
    // If successful, dispatch success action with result
    .map(res => ({ type: productCart.REMOVE_SUCCESS, payload: res }))
    // If request fails, dispatch failed action
    .catch(() => Observable.of({ type: productCart.REMOVE_FAIL}))
  );

  @Effect() removeAll$ = this.actions$
  .ofType(productCart.REMOVE_ALL)
  .switchMap((action:any) => this.productCartService.removeAllCart()
    // If successful, dispatch success action with result
    .map(res => ({ type: productCart.REMOVE_ALL_SUCCESS, payload: res }))
    // If request fails, dispatch failed action
    .catch(() => Observable.of({ type: productCart.REMOVE_ALL_FAIL}))
  );
}