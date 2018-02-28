var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
var ItemCheckoutPage = /** @class */ (function () {
    function ItemCheckoutPage(navParams, sanitizer) {
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        var variants = this.navParams.get('variants');
        this.checkoutLink = 'https://suplo-food.myharavan.com/cart/' + variants;
        console.log('variants string', this.checkoutLink);
        this.checkoutLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.checkoutLink);
    }
    ItemCheckoutPage.prototype.frameLoad = function () {
    };
    ItemCheckoutPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-item-checkout',
            templateUrl: 'item-checkout.html',
        }),
        __metadata("design:paramtypes", [NavParams,
            DomSanitizer])
    ], ItemCheckoutPage);
    return ItemCheckoutPage;
}());
export { ItemCheckoutPage };
//# sourceMappingURL=item-checkout.js.map