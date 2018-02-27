var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ItemProvider } from './../../providers/item/item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/take';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Store } from '@ngrx/store';
import * as cartActions from '../../store/product-cart/product-cart.actions';
import { ToastController } from 'ionic-angular';
var ItemCollectionPage = /** @class */ (function () {
    function ItemCollectionPage(navCtrl, itemProvider, navParams, store, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.itemProvider = itemProvider;
        this.navParams = navParams;
        this.store = store;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.pageName = "";
        this.products = [];
        this.setPageName();
        this.getProducts();
    }
    ItemCollectionPage.prototype.setPageName = function () {
        this.pageName = this.navParams.get('title');
    };
    ItemCollectionPage.prototype.startLoading = function () {
        // start loading
        var loading = this.loadingCtrl.create({
            content: 'Đang tải dữ liệu...'
        });
        loading.present();
        return loading;
    };
    ItemCollectionPage.prototype.getProducts = function () {
        var _this = this;
        var loading = this.startLoading();
        this.collections = this.itemProvider
            .getProducts(this.navParams.get('handle'))
            .take(1)
            .subscribe(function (data) {
            data.products.map(function (product) {
                if (product.featured_image.startsWith('//')) {
                    product['featured_image'] = 'https:' + product.featured_image;
                }
                return product;
            });
            _this.products = data.products;
            _this.paginate = data.paginate;
            loading.dismiss();
        });
    };
    ItemCollectionPage.prototype.ionViewDidLoad = function () {
    };
    ItemCollectionPage.prototype.goDetail = function (handle) {
        this.navCtrl.push('ItemProductPage', { handle: handle });
    };
    ItemCollectionPage.prototype.addToCart = function (collectionProduct) {
        var _this = this;
        var entities$ = this.store.select('cart', 'entities').take(1);
        var productVariant$ = this.normalizeItem(collectionProduct);
        combineLatest(entities$, productVariant$, function (variants, _a) {
            var product = _a.product, variant = _a.variant;
            if (variants[variant.id] == undefined || variants[variant.id].selectedVariant != variant.selectedVariant) {
                _this.store.dispatch(new cartActions.AddAction(variant));
                _this.presentToast("\u0110\u00E3 th\u00EAm " + product.title + " lo\u1EA1i " + variant.title);
            }
            else {
                _this.store.dispatch(new cartActions.IncreaseAction(variant));
                _this.presentToast("T\u0103ng 1 s\u1EA3n ph\u1EA9m " + product.title + " b\u1EA3n " + variant.title);
            }
            console.log('product ' + JSON.stringify(product));
            console.log('variants ' + JSON.stringify(variants));
            console.log('collectionProduct ' + JSON.stringify(collectionProduct));
        })
            .subscribe();
    };
    ItemCollectionPage.prototype.normalizeItem = function (collectionProduct) {
        return this.itemProvider
            .getProduct(collectionProduct.handle).take(1)
            .map(function (product) {
            var variant = product.variants[0];
            //setup default featured image
            variant['default_featured_image'] = product.featured_image;
            // setup product title
            variant['productTitle'] = product.title;
            return { product: product, variant: variant };
        });
    };
    ItemCollectionPage.prototype.changeFilter = function (filter) {
        var _this = this;
        if (filter == "0:max")
            this.getProducts();
        else {
            var loading_1 = this.startLoading();
            this.itemProvider.searchRange(this.navParams.get('id'), filter.split(":")[0], filter.split(":")[1])
                .take(1)
                .subscribe(function (data) {
                data.products.map(function (product) {
                    if (product.featured_image.startsWith('//')) {
                        product['featured_image'] = 'https:' + product.featured_image;
                    }
                    return product;
                });
                _this.products = data.products;
                _this.paginate = data.paginate;
                loading_1.dismiss();
            });
        }
    };
    ItemCollectionPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000
        });
        toast.present();
    };
    ItemCollectionPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-item-collection',
            templateUrl: 'item-collection.html',
        }),
        __metadata("design:paramtypes", [NavController,
            ItemProvider,
            NavParams,
            Store,
            LoadingController,
            ToastController])
    ], ItemCollectionPage);
    return ItemCollectionPage;
}());
export { ItemCollectionPage };
//# sourceMappingURL=item-collection.js.map