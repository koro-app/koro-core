var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ProductCartService } from './product-cart.service';
import * as productCart from './product-cart.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
var ProductCartEffects = /** @class */ (function () {
    function ProductCartEffects(productCartService, actions$) {
        var _this = this;
        this.productCartService = productCartService;
        this.actions$ = actions$;
        this.getAll$ = this.actions$
            .ofType(productCart.GET_PRODUCTS)
            .switchMap(function (action) { return _this.productCartService.getAll()
            .map(function (res) { return ({ type: productCart.GET_PRODUCTS_SUCCESS, payload: res }); })
            .catch(function () { return Observable.of({ type: productCart.GET_PRODUCTS_FAIL }); }); });
        this.add$ = this.actions$
            .ofType(productCart.ADD)
            .switchMap(function (action) { return _this.productCartService.addCart(action.payload)
            .map(function (res) { return ({ type: productCart.ADD_SUCCESS, payload: res }); })
            .catch(function () { return Observable.of({ type: productCart.ADD_FAIL }); }); });
        this.increase$ = this.actions$
            .ofType(productCart.INCREASE)
            .switchMap(function (action) { return _this.productCartService.increaseCart(action.payload)
            .map(function (res) { return ({ type: productCart.INCREASE_SUCCESS, payload: res }); })
            .catch(function () { return Observable.of({ type: productCart.INCREASE_FAIL }); }); });
        this.decrease$ = this.actions$
            .ofType(productCart.DECREASE)
            .switchMap(function (action) { return _this.productCartService.decreaseCart(action.payload)
            .map(function (res) { return ({ type: productCart.DECREASE_SUCCESS, payload: res }); })
            .catch(function () { return Observable.of({ type: productCart.DECREASE_FAIL }); }); });
        this.remove$ = this.actions$
            .ofType(productCart.REMOVE)
            .switchMap(function (action) { return _this.productCartService.removeCart(action.payload)
            .map(function (res) { return ({ type: productCart.REMOVE_SUCCESS, payload: res }); })
            .catch(function () { return Observable.of({ type: productCart.REMOVE_FAIL }); }); });
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], ProductCartEffects.prototype, "getAll$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], ProductCartEffects.prototype, "add$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], ProductCartEffects.prototype, "increase$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], ProductCartEffects.prototype, "decrease$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], ProductCartEffects.prototype, "remove$", void 0);
    ProductCartEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ProductCartService,
            Actions])
    ], ProductCartEffects);
    return ProductCartEffects;
}());
export { ProductCartEffects };
//# sourceMappingURL=product-cart.effects.js.map