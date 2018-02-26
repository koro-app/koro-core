var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter, Input } from '@angular/core';
/**
 * Generated class for the ItemCollectionListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ItemCollectionListComponent = /** @class */ (function () {
    function ItemCollectionListComponent() {
        this.goDetail = new EventEmitter();
        this.addToCart = new EventEmitter();
        console.log('Hello ItemCollectionListComponent Component');
        // select.open()
    }
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ItemCollectionListComponent.prototype, "products", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ItemCollectionListComponent.prototype, "goDetail", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ItemCollectionListComponent.prototype, "addToCart", void 0);
    ItemCollectionListComponent = __decorate([
        Component({
            selector: 'item-collection-list',
            templateUrl: 'item-collection-list.html'
        }),
        __metadata("design:paramtypes", [])
    ], ItemCollectionListComponent);
    return ItemCollectionListComponent;
}());
export { ItemCollectionListComponent };
//# sourceMappingURL=item-collection-list.js.map