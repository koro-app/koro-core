var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Pipe } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the ItemProductDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SafePipe = /** @class */ (function () {
    function SafePipe(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    SafePipe.prototype.transform = function (value, type) {
        if (type === void 0) { type = 'html'; }
        switch (type) {
            case 'html': return this._sanitizer.bypassSecurityTrustHtml(value);
            case 'style': return this._sanitizer.bypassSecurityTrustStyle(value);
            case 'script': return this._sanitizer.bypassSecurityTrustScript(value);
            case 'url': return this._sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl': return this._sanitizer.bypassSecurityTrustResourceUrl(value);
            default: throw new Error("Err: " + type);
        }
    };
    SafePipe = __decorate([
        Pipe({
            name: 'safe'
        }),
        __metadata("design:paramtypes", [DomSanitizer])
    ], SafePipe);
    return SafePipe;
}());
export { SafePipe };
var ItemProductDescriptionPage = /** @class */ (function () {
    function ItemProductDescriptionPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.description = this.navParams.get('description');
    }
    ItemProductDescriptionPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad ItemProductDescriptionPage');
    };
    ItemProductDescriptionPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ItemProductDescriptionPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-item-product-description',
            templateUrl: 'item-product-description.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ViewController])
    ], ItemProductDescriptionPage);
    return ItemProductDescriptionPage;
}());
export { ItemProductDescriptionPage };
//# sourceMappingURL=item-product-description.js.map