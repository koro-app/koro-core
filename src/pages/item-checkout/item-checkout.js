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
import { IonicPage, NavParams, ViewController, NavController, AlertController } from 'ionic-angular';
// import { DomSanitizer } from '@angular/platform-browser';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
// storage
import { Storage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import * as cartActions from '../../store/product-cart/product-cart.actions';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
var ItemCheckoutPage = /** @class */ (function () {
    function ItemCheckoutPage(navParams, 
    // public sanitizer: DomSanitizer,
    viewCtrl, alertCtrl, navCtrl, themeBrowser, storage, store) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.themeBrowser = themeBrowser;
        this.storage = storage;
        this.store = store;
        // checkout
        this.data_post_structor = {
            "line_items": [],
            "note": "",
            "full_name": "",
            "email": "",
            "phone": "",
            "address": "",
            "province_id": null,
        };
        this.options = {
            statusbar: {
                color: '#000000'
            },
            toolbar: {
                height: 44,
                color: '#000000'
            },
            title: {
                color: '#ffffff',
                staticText: 'Thanh toán đơn hàng'
            },
            closeButton: {
                wwwImage: 'assets/icon/back.png',
                align: 'left',
                event: 'closePressed'
            },
            // clearcache: true,
            // clearsessioncache: true,
            backButtonCanClose: true
        };
        // let variants = this.navParams.get('variants');
        // this.checkoutLink = 'https://suplo-fashion.myharavan.com/cart/' + variants;
        // console.log('variants string',this.checkoutLink)
        // this.checkoutLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.checkoutLink)
        this.directCheckout();
    }
    ItemCheckoutPage.prototype.frameLoad = function () {
    };
    ItemCheckoutPage.prototype.directCheckout = function () {
        var _this = this;
        this.storage.get('noteToCart').then(function (note) {
            _this.data_post_structor.note = note;
        });
        this.variants = this.navParams.get('variants');
        for (var i = 0; i <= this.variants.length - 1; i++) {
            if (this.variants[i] != null && this.variants[i] != undefined) {
                var item = {
                    "variant_id": this.variants[i].id,
                    "title": this.variants[i].productTitle,
                    "vendor": this.variants[i].vendor,
                    "quantity": this.variants[i].quantity
                };
                this.data_post_structor.line_items.push(item);
            }
        }
        var data_post_encode = encodeURIComponent(JSON.stringify(this.data_post_structor));
        //tao url
        var url = "https://suplo-fashion.myharavan.com/cart?data=" + data_post_encode + "&view=app&themeid=1000232392";
        this.brower = this.themeBrowser.create(url, '_blank', this.options);
        this.actionInBrowser();
    };
    // kiem tra su kien tren browser checkout
    ItemCheckoutPage.prototype.actionInBrowser = function () {
        var _this = this;
        this.brower.on("loadstop").subscribe(function (error) {
            _this.brower.insertCss({
                "code": "body{background-color: white;}"
            });
        });
        this.brower.on("ThemeableBrowserError").subscribe(function (error) {
            console.log(error);
            _this.brower.close();
        });
        // dat hang thanh cong => xoa gio hang
        this.brower.on("closePressed").subscribe(function (data) {
            console.log("closePressed :  " + data.url.indexOf('thank_you'));
            if (data.url.indexOf('thank_you') !== -1) {
                _this.removeItemWhenCheckoutSuccess();
                _this.brower.close();
            }
            else {
                _this.brower.close();
                // this.navCtrl.push(this.navCtrl.getActive().component).then(() => {
                //   let index = this.viewCtrl.index;
                //   this.navCtrl.remove(index);
                // })
            }
        });
        this.brower.on("loadfail").subscribe(function (error) {
            console.log(error);
            _this.alertNoti("Kiểm tra lại kết nối!");
            _this.brower.close();
        });
        this.brower.on("unexpected").subscribe(function (error) {
            console.log(error);
            _this.brower.close();
        });
        this.brower.on("undefined").subscribe(function (error) {
            console.log(error);
            _this.brower.close();
        });
        this.brower.on("ThemeableBrowserWarning").subscribe(function (error) {
            console.log(error);
        });
        this.brower.on("critical").subscribe(function (error) {
            console.log(error);
        });
    };
    // when checkout success, remove item has selected = true
    ItemCheckoutPage.prototype.removeItemWhenCheckoutSuccess = function () {
        for (var i = 0; i <= this.variants.length - 1; i++) {
            if (this.variants[i] != null && this.variants[i] != undefined) {
                this.store.dispatch(new cartActions.RemoveItemCheckout(this.variants[i]));
            }
        }
    };
    ItemCheckoutPage.prototype.alertNoti = function (text) {
        var noti = this.alertCtrl.create({
            message: text
        });
        noti.present();
        setTimeout(function () {
            if (noti.isOverlay) {
                noti.dismiss();
            }
        }, 3000);
    };
    ItemCheckoutPage.prototype.ionViewDidEnter = function () {
        this.navCtrl.pop();
    };
    ItemCheckoutPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-item-checkout',
            templateUrl: 'item-checkout.html',
        }),
        __metadata("design:paramtypes", [NavParams,
            ViewController,
            AlertController,
            NavController,
            ThemeableBrowser,
            Storage,
            Store])
    ], ItemCheckoutPage);
    return ItemCheckoutPage;
}());
export { ItemCheckoutPage };
//# sourceMappingURL=item-checkout.js.map