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
import { Store } from '@ngrx/store';
import { ItemProvider } from './../../providers/item/item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ModalController, PopoverController } from 'ionic-angular';
import * as seenProductActions from '../../store/seen-product/seen-product.actions';
import 'rxjs/add/operator/take';
var ItemProductPage = /** @class */ (function () {
    function ItemProductPage(navCtrl, navParams, itemProvider, modalCtrl, store, toastCtrl, popoverCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemProvider = itemProvider;
        this.modalCtrl = modalCtrl;
        this.store = store;
        this.toastCtrl = toastCtrl;
        this.popoverCtrl = popoverCtrl;
        this.loadingCtrl = loadingCtrl;
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.getProduct();
        this.getSeenProduct();
    }
    ItemProductPage.prototype.startLoading = function () {
        // start loading
        var loading = this.loadingCtrl.create({
            content: 'Đang tải dữ liệu...'
        });
        loading.present();
        return loading;
    };
    ItemProductPage.prototype.getProduct = function () {
        var _this = this;
        this.itemProvider
            .getProduct(this.navParams.get('handle'))
            .take(1)
            .subscribe(function (data) {
            _this.normalize(data);
            _this.store.dispatch(new seenProductActions.AddSeenAction(data.product));
        });
    };
    ItemProductPage.prototype.getSeenProduct = function () {
        this.seenProducts = this.store.select('seenProduct', 'entities')
            .map(function (products) { return Object.keys(products || {}).map(function (key) { return products[key]; }); })
            .do(function (products) {
            console.log('products', products);
        });
    };
    ItemProductPage.prototype.normalize = function (data) {
        this.product = data;
        this.productDetail = data.product;
        // create sale percent
        // this.product['sale'] = Math.round(100 - data.price/data.compare_at_price*100)
        // recaculate price
        // this.product['price'] = Math.round(this.product.price/100);
        // // for VND style price
        // this.product['showPrice'] = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(this.product.price);
        // for wrong image
        // if ((<string>this.productDetail.featured_image).startsWith('//')) {
        //   this.productDetail['featured_image'] = 'https:' + this.productDetail.featured_image;
        // }
        for (var j = 0; j <= this.productDetail.variants.length - 1; j++) {
            if (this.productDetail.variants[j].image == '' || this.productDetail.variants[j].image == null) {
                this.productDetail.variants[j].image = this.productDetail.images[0];
            }
        }
        // creating options variant
        this.options = this.generateOptions(this.productDetail.options, this.productDetail.variants);
        this.options = this.options.map(function (option) {
            option.details = option.details.map(function (detail) {
                return {
                    name: detail,
                    disabled: false,
                    checked: false
                };
            });
            /*
              return value is:
              {
                name: 'Đường kính',
                position: '1',
                details: [{
                  name: 40cm,
                  disabled: false
                }],
                selectedDetail: '40cm'
              }
            */
            return option;
        });
    };
    ItemProductPage.prototype.generateOptions = function (options, variants) {
        var _this = this;
        return options.map(function (option) {
            var details = variants.map(function (variant) {
                return variant["option" + option.position];
            });
            details = _this.uniqueArray(details);
            /*
              return value is:
              {
                name: 'Đường kính',
                position: '1',
                details: ['40cm','30cm','20cm'],
                selectedDetail: '40cm'
              }
            */
            return __assign({}, option, { details: details, selectedDetail: details[0] });
        });
    };
    ItemProductPage.prototype.uniqueArray = function (arrArg) {
        return arrArg.filter(function (elem, i, arr) {
            return arr.indexOf(elem) == i;
        });
    };
    ;
    ItemProductPage.prototype.ionViewDidLoad = function () {
    };
    ItemProductPage.prototype.presentModal = function () {
        var modal = this.modalCtrl.create('ItemProductDescriptionPage', { description: this.productDetail.body_html });
        modal.present();
    };
    ItemProductPage.prototype.selectedVariant = function (event) {
        this.product['selectedVariant'] = event;
    };
    ItemProductPage.prototype.getVariantByTitle = function (product, title) {
        var variant = product.variants.filter(function (variant) { return variant.title == title; })[0];
        // console.log('variant',variant);
        //setup default featured image
        variant['default_featured_image'] = product.featured_image;
        // setup product title
        variant['productTitle'] = product.title;
        return variant;
    };
    // view variant
    ItemProductPage.prototype.viewVariant = function () {
        var popover = this.popoverCtrl.create('ItemVariantPage', {
            title: this.productDetail.title,
            variants: this.productDetail.variants,
            options: this.options
        }, { cssClass: 'variant-product' });
        popover.present();
    };
    // view product
    ItemProductPage.prototype.viewProduct = function (handle) {
        this.navCtrl.push('ItemProductPage', { handle: handle });
    };
    ItemProductPage.prototype.goSearch = function () {
        this.navCtrl.push('ItemSearchPage');
    };
    ItemProductPage.prototype.goCollection = function (handle, title) {
        this.navCtrl.push('ItemCollectionPage', {
            handle: handle,
            title: title
        });
    };
    ItemProductPage.prototype.goSeenProduct = function () {
        this.navCtrl.push('ItemSeenProductPage');
    };
    ItemProductPage.prototype.viewNoti = function () {
        this.navCtrl.push('ItemNotificationsPage');
    };
    // hide tabbar on page product
    ItemProductPage.prototype.ionViewWillEnter = function () {
        if (this.tabBarElement != null) {
            this.tabBarElement.style.display = 'none';
        }
    };
    // show normail tabbar
    ItemProductPage.prototype.ionViewWillLeave = function () {
        if (this.tabBarElement != null) {
            this.tabBarElement.style.display = 'flex';
        }
    };
    ItemProductPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-item-product',
            templateUrl: 'item-product.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ItemProvider,
            ModalController,
            Store,
            ToastController,
            PopoverController,
            LoadingController])
    ], ItemProductPage);
    return ItemProductPage;
}());
export { ItemProductPage };
//# sourceMappingURL=item-product.js.map