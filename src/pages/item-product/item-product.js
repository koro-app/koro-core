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
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ModalController, PopoverController } from 'ionic-angular';
import * as cartActions from '../../store/product-cart/product-cart.actions';
var ItemProductPage = /** @class */ (function () {
    function ItemProductPage(navCtrl, navParams, itemProvider, modalCtrl, store, toastCtrl, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemProvider = itemProvider;
        this.modalCtrl = modalCtrl;
        this.store = store;
        this.toastCtrl = toastCtrl;
        this.popoverCtrl = popoverCtrl;
        this.getProduct();
    }
    ItemProductPage.prototype.getProduct = function () {
        var _this = this;
        this.itemProvider
            .getProduct(this.navParams.get('handle'))
            .take(1)
            .subscribe(function (data) {
            _this.normalize(data);
        });
    };
    ItemProductPage.prototype.normalize = function (data) {
        this.product = data;
        // create sale percent
        this.product['sale'] = Math.round(100 - data.price / data.compare_at_price * 100);
        // recaculate price
        this.product['price'] = Math.round(this.product.price / 100);
        // // for VND style price
        // this.product['showPrice'] = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(this.product.price);
        // for wrong image
        if (this.product.featured_image.startsWith('//')) {
            this.product['featured_image'] = 'https:' + this.product.featured_image;
        }
        // creating options variant
        this.options = this.generateOptions(this.product.options, this.product.variants);
    };
    ItemProductPage.prototype.generateOptions = function (options, variants) {
        var _this = this;
        return options.map(function (option) {
            var details = variants.map(function (variant) { return variant["option" + option.position]; });
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
        var modal = this.modalCtrl.create('ItemProductDescriptionPage', { description: this.product.description });
        modal.present();
    };
    ItemProductPage.prototype.addToCart = function (product) {
        var _this = this;
        this.store.select('cart', 'entities')
            .take(1)
            .subscribe(function (variants) {
            var variant = _this.getVariantByTitle(product, product.selectedVariant);
            if (variants[variant.id] == undefined || variants[variant.id].selectedVariant != variant.selectedVariant) {
                _this.store.dispatch(new cartActions.AddAction(variant));
                _this.presentToast("\u0110\u00E3 th\u00EAm " + product.title + " lo\u1EA1i " + variant.title);
            }
            else {
                _this.store.dispatch(new cartActions.IncreaseAction(variant));
                _this.presentToast("T\u0103ng 1 s\u1EA3n ph\u1EA9m " + product.title + " b\u1EA3n " + variant.title);
            }
        });
    };
    ItemProductPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000
        });
        toast.present();
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
            variant: this.product
        }, { cssClass: 'variant-product' });
        popover.present();
    };
    // view product
    ItemProductPage.prototype.viewProduct = function (detail) {
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
            PopoverController])
    ], ItemProductPage);
    return ItemProductPage;
}());
export { ItemProductPage };
//# sourceMappingURL=item-product.js.map