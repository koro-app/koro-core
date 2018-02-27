var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { ItemCollectionPage } from './../item-collection/item-collection';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';
var ItemSearchPage = /** @class */ (function (_super) {
    __extends(ItemSearchPage, _super);
    function ItemSearchPage(navCtrl, navParams, viewCtrl, itemProvider, store, loadingCtrl, toastCtrl) {
        var _this = _super.call(this, navCtrl, itemProvider, navParams, store, loadingCtrl, toastCtrl) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.viewCtrl = viewCtrl;
        _this.itemProvider = itemProvider;
        _this.store = store;
        _this.loadingCtrl = loadingCtrl;
        _this.toastCtrl = toastCtrl;
        return _this;
    }
    ItemSearchPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad ItemSearchPage');
    };
    ItemSearchPage.prototype.onCancel = function () {
    };
    ItemSearchPage.prototype.setPageName = function () {
        // we dont do this, so let it empty
    };
    ItemSearchPage.prototype.getProducts = function () {
        // we dont do this, so let it empty
    };
    ItemSearchPage.prototype.onInput = function (ev) {
        var _this = this;
        var val = ev.target.value;
        this.itemProvider.searchString(val)
            .take(1)
            .debounceTime(500)
            .subscribe(function (data) {
            data.products.map(function (product) {
                if (product.featured_image.startsWith('//')) {
                    product['featured_image'] = 'https:' + product.featured_image;
                }
                return product;
            });
            _this.products = data.products;
            _this.paginate = data.paginate;
        });
    };
    ItemSearchPage.prototype.shouldShowCancel = function () {
    };
    ItemSearchPage.prototype.back = function () {
        this.viewCtrl.dismiss();
    };
    ItemSearchPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-item-search',
            templateUrl: 'item-search.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ViewController,
            ItemProvider,
            Store,
            LoadingController,
            ToastController])
    ], ItemSearchPage);
    return ItemSearchPage;
}(ItemCollectionPage));
export { ItemSearchPage };
//# sourceMappingURL=item-search.js.map