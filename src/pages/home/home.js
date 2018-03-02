var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Store } from '@ngrx/store';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, IonicPage, Platform } from 'ionic-angular';
import * as cartActions from '../../store/product-cart/product-cart.actions';
import * as seenProductActions from '../../store/seen-product/seen-product.actions';
import 'rxjs/add/operator/do';
import { ItemProvider } from '../../providers/item/item';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, store, itemProvider, platform, ref) {
        this.navCtrl = navCtrl;
        this.store = store;
        this.itemProvider = itemProvider;
        this.platform = platform;
        this.ref = ref;
        this.showToolbar = false;
        this.getProducts();
        this.getBanner();
        this.getSeenProducts();
    }
    HomePage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 120;
        this.ref.detectChanges();
    };
    HomePage.prototype.getSeenProducts = function () {
        this.store.dispatch(new seenProductActions.GetAllSeenAction());
    };
    HomePage.prototype.getProducts = function () {
        this.store.dispatch(new cartActions.GetProductsAction());
    };
    HomePage.prototype.checkout = function () {
        this.navCtrl.push('ItemCartPage', {}, { animate: true, direction: 'forward' });
    };
    HomePage.prototype.onCancel = function () {
    };
    HomePage.prototype.onInput = function (ev, keycode) {
        var val = ev.target.value;
        console.log('keycode', keycode);
        if (keycode == 13) {
            this.navCtrl.push('ItemSearchPage', { value: val });
        }
    };
    HomePage.prototype.shouldShowCancel = function () {
    };
    HomePage.prototype.search = function () {
        this.navCtrl.push('ItemSearchPage');
    };
    // get banner
    HomePage.prototype.getBanner = function () {
        var _this = this;
        this.itemProvider.getConfig()
            .subscribe(function (data) {
            _this.banner = data.home.banner[1].src;
        });
    };
    HomePage.prototype.scanBarCode = function () {
        this.navCtrl.push('ItemBarcodePage');
    };
    HomePage.prototype.viewNoti = function () {
        this.navCtrl.push('ItemNotificationsPage');
    };
    HomePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            Store,
            ItemProvider,
            Platform,
            ChangeDetectorRef])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map