import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { SeenProductService } from './seen-product.service';
import * as seenProduct from './seen-product.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class SeenProductEffects {
  constructor(
    private seenProductService: SeenProductService,
    private actions$: Actions
  ) { }

  @Effect() getAll$ = this.actions$
      .ofType(seenProduct.GET_ALL)
      .switchMap((action:any) => this.seenProductService.getAll()
        // If successful, dispatch success action with result
        .map(res => ({ type: seenProduct.GET_ALL_SUCCESS, payload: res }))
        // If request fails, dispatch failed action
        .catch(() => Observable.of({ type: seenProduct.GET_ALL_FAILED}))
      );

  @Effect() addSeen$ = this.actions$
      .ofType(seenProduct.ADD_SEEN)
      .switchMap((action:any) => this.seenProductService.add(action.payload)
        // If successful, dispatch success action with result
        .map(res => ({ type: seenProduct.ADD_SEEN_SUCCESS, payload: res }))
        // If request fails, dispatch failed action
        .catch(() => Observable.of({ type: seenProduct.ADD_SEEN_FAILED}))
      );
}