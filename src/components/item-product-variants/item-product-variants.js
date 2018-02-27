var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, EventEmitter, Output } from '@angular/core';
/**
 * Generated class for the ItemProductVariantsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ItemProductVariantsComponent = /** @class */ (function () {
    function ItemProductVariantsComponent() {
        this.selectedVariant = new EventEmitter();
    }
    ItemProductVariantsComponent.prototype.ngOnInit = function () {
        this.emitVariant();
    };
    ItemProductVariantsComponent.prototype.selectedDetail = function (option, detail) {
        this.options[option.position - 1].selectedDetail = detail;
        this.emitVariant();
    };
    ItemProductVariantsComponent.prototype.emitVariant = function () {
        var variantString = this.options
            .map(function (option) { return option.selectedDetail; })
            .join(' / ');
        this.selectedVariant.emit(variantString);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ItemProductVariantsComponent.prototype, "options", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ItemProductVariantsComponent.prototype, "selectedVariant", void 0);
    ItemProductVariantsComponent = __decorate([
        Component({
            selector: 'item-product-variants',
            templateUrl: 'item-product-variants.html'
        }),
        __metadata("design:paramtypes", [])
    ], ItemProductVariantsComponent);
    return ItemProductVariantsComponent;
}());
export { ItemProductVariantsComponent };
//# sourceMappingURL=item-product-variants.js.map