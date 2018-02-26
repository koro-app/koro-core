var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Platform } from 'ionic-angular';
import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
var ItemProvider = /** @class */ (function () {
    function ItemProvider(http, platform) {
        this.http = http;
        this.platform = platform;
        this.endpoint = '/api';
        if (platform.is('cordova'))
            this.endpoint = 'https://suplo-fashion.myharavan.com';
    }
    ItemProvider.prototype.getConfig = function () {
        return this.http.get(this.endpoint + "/?view=settings.app.json");
    };
    ItemProvider.prototype.getProducts = function (handle) {
        if (handle === void 0) { handle = "all"; }
        return this.http.get(this.endpoint + "/collections/" + handle + "?view=app.json");
    };
    ItemProvider.prototype.getProduct = function (handle) {
        // return this.http.get(`${this.endpoint}/products/${handle}.js`)
        return this.http.get(this.endpoint + "/products/" + handle + "?view=app.json");
    };
    ItemProvider.prototype.searchRange = function (collectionId, min, max) {
        if (collectionId) {
            return this.http.get(this.endpoint + "/search?&q=filter=(((collectionid:product=" + collectionId + ")&&(price:product>" + min + ")&&(price:product<" + max + ")))&view=app.json");
        }
        return this.http.get(this.endpoint + "/search?&q=filter=(((price:product>" + min + ")&&(price:product<" + max + ")))&view=app.json");
    };
    ItemProvider.prototype.searchString = function (string) {
        console.log(this.endpoint + "/search?&q=filter=((title:product**" + string + "))&view=app.json");
        return this.http.get(this.endpoint + "/search?&q=filter=((title:product**" + string + "))&view=app.json");
    };
    ItemProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            Platform])
    ], ItemProvider);
    return ItemProvider;
}());
export { ItemProvider };
//# sourceMappingURL=item.js.map