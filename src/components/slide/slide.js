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
 * Generated class for the SlideComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var SlideComponent = /** @class */ (function () {
    function SlideComponent(navCtrl, itemProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.itemProvider = itemProvider;
        // get slides
        this.itemProvider.getConfig()
            .subscribe(function (data) {
            _this.slides = data.home.slider;
        });
        // this.slides = [
        //   'https://theme.hstatic.net/1000259614/1000332464/14/slideshow_1.png?v=162',
        //   'https://theme.hstatic.net/1000259614/1000332464/14/slideshow_2.png?v=162'
        // ]
    }
    SlideComponent.prototype.goAll = function () {
        this.navCtrl.push('ItemCollectionPage', { handle: 'all', name: 'Tất cả sản phẩm' });
    };
    SlideComponent = __decorate([
        Component({
            selector: 'slide',
            templateUrl: 'slide.html'
        }),
        __metadata("design:paramtypes", [NavController,
            ItemProvider])
    ], SlideComponent);
    return SlideComponent;
}());
export { SlideComponent };
//# sourceMappingURL=slide.js.map