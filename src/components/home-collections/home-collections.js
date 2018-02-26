var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ItemProvider } from '../../providers/item/item';
/**
 * Generated class for the HomeCategoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var HomeCollectionsComponent = /** @class */ (function () {
    function HomeCollectionsComponent(navCtrl, itemProvider) {
        this.navCtrl = navCtrl;
        this.itemProvider = itemProvider;
        this.getHomeCollections();
    }
    // get home collections
    HomeCollectionsComponent.prototype.getHomeCollections = function () {
        var _this = this;
        this.itemProvider.getConfig()
            .subscribe(function (data) {
            _this.collections = data.home.listcollections;
        });
    };
    HomeCollectionsComponent.prototype.goCollection = function (collection) {
        this.navCtrl.push('ItemCollectionPage', collection);
    };
    HomeCollectionsComponent = __decorate([
        Component({
            selector: 'home-collections',
            templateUrl: 'home-collections.html'
        }),
        __metadata("design:paramtypes", [NavController,
            ItemProvider])
    ], HomeCollectionsComponent);
    return HomeCollectionsComponent;
}());
export { HomeCollectionsComponent };
//# sourceMappingURL=home-collections.js.map