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
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
var ItemCheckoutPage = /** @class */ (function () {
    function ItemCheckoutPage(navParams, sanitizer, themeBrowser) {
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        this.themeBrowser = themeBrowser;
        // checkout
        this.data_post_structor = {
            "line_items": [],
            "full_name": "",
            "email": "",
            "phone": "",
            "address": "",
            "province_id": null,
        };
        this.options2 = {
            statusbar: {
                color: '#db3235'
            },
            toolbar: {
                height: 44,
                color: '#db3235'
            },
            title: {
                color: '#ffffff',
                staticText: 'Thanh toán đơn hàng'
            },
            closeButton: {
                // wwwImage: 'assets/icon/back.png',
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
        var variants = this.navParams.get('variants');
        this.data_post_structor.line_items.push(variants);
        console.log('variants', variants);
        var data_post_encode = encodeURIComponent(JSON.stringify(this.data_post_structor));
        //tao url
        var url = "https://suplo-fashion.myharavan.com/cart?data=" + data_post_encode + "&view=app&themeid=1000232392";
        // this.checkoutLink = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        var brower = this.themeBrowser.create(url, '_blank', this.options2);
    };
    ItemCheckoutPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-item-checkout',
            templateUrl: 'item-checkout.html',
        }),
        __metadata("design:paramtypes", [NavParams,
            DomSanitizer,
            ThemeableBrowser])
    ], ItemCheckoutPage);
    return ItemCheckoutPage;
}());
export { ItemCheckoutPage };
//# sourceMappingURL=item-checkout.js.map