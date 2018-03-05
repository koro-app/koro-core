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
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';
/**
 * Generated class for the ItemListCollectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ItemListCollectionPage = /** @class */ (function () {
    function ItemListCollectionPage(navCtrl, navParams, loadingCtrl, itemProviders) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.itemProviders = itemProviders;
        this.getListCollection();
    }
    ItemListCollectionPage.prototype.getListCollection = function () {
        var _this = this;
        var loading = this.startLoading();
        this.itemProviders.getListCollection().subscribe(function (data) {
            _this.collections = data['listcollections'];
            loading.dismiss();
        });
    };
    ItemListCollectionPage.prototype.startLoading = function () {
        // start loading
        var loading = this.loadingCtrl.create({
            content: 'Đang tải dữ liệu...'
        });
        loading.present();
        return loading;
    };
    ItemListCollectionPage.prototype.goCollection = function (collection) {
        this.navCtrl.push('ItemCollectionPage', collection);
    };
    ItemListCollectionPage.prototype.goSearch = function () {
        this.navCtrl.push('ItemSearchPage');
    };
    ItemListCollectionPage.prototype.viewNoti = function () {
        this.navCtrl.push('ItemNotificationsPage');
    };
    ItemListCollectionPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad ItemListCollectionPage');
    };
    ItemListCollectionPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-item-list-collection',
            templateUrl: 'item-list-collection.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LoadingController,
            ItemProvider])
    ], ItemListCollectionPage);
    return ItemListCollectionPage;
}());
export { ItemListCollectionPage };
//# sourceMappingURL=item-list-collection.js.map