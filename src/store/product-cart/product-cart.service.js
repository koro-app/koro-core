var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';
var ProductCartService = /** @class */ (function () {
    function ProductCartService(storage) {
        this.storage = storage;
        this.cart = {};
    }
    ProductCartService.prototype.getAll = function () {
        var _this = this;
        return Observable.from(this.storage.ready()
            .then(function () { return _this.storage.get('cart').then(function (value) {
            // return this.storage.set('cart',{})
            _this.cart = value;
            if (value)
                return value;
            return {};
        }); }));
    };
    ProductCartService.prototype.addCart = function (product) {
        this.cart = __assign({}, this.cart, (_a = {}, _a[product.id] = __assign({}, product, { quantity: 1 }), _a));
        return Observable.from(this.checkPoint())
            .mergeMap(function () { return Observable.of(product); });
        var _a;
    };
    ProductCartService.prototype.increaseCart = function (product) {
        this.cart = __assign({}, this.cart, (_a = {}, _a[product.id] = __assign({}, this.cart[product.id], { quantity: (+this.cart[product.id].quantity) + 1 }), _a));
        return Observable.from(this.checkPoint())
            .mergeMap(function () { return Observable.of(product); });
        var _a;
    };
    ProductCartService.prototype.decreaseCart = function (product) {
        this.cart = __assign({}, this.cart, (_a = {}, _a[product.id] = __assign({}, this.cart[product.id], { quantity: (+this.cart[product.id].quantity) - 1 }), _a));
        return Observable.from(this.checkPoint())
            .mergeMap(function () { return Observable.of(product); });
        var _a;
    };
    ProductCartService.prototype.removeCart = function (product) {
        var _a = this.cart, _b = product.id, deletedItem = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
        this.cart = rest;
        return Observable.from(this.checkPoint())
            .mergeMap(function () { return Observable.of(product); });
    };
    ProductCartService.prototype.checkPoint = function () {
        var _this = this;
        // console.log('cart to save',this.cart)
        return this.storage.ready().then(function () { return _this.storage.set('cart', _this.cart); });
    };
    ProductCartService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage])
    ], ProductCartService);
    return ProductCartService;
}());
export { ProductCartService };
//# sourceMappingURL=product-cart.service.js.map