var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
/**
 * Generated class for the ItemCollectionFilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ItemCollectionFilterComponent = /** @class */ (function () {
    function ItemCollectionFilterComponent() {
        this.filterList = [
            {
                name: 'Bộ lọc',
                range: '0:max',
                selected: true
            },
            {
                name: 'Nhỏ hơn 100,000₫',
                range: '0:100000',
                selected: false
            },
            {
                name: 'Từ 100,000₫ - 300,000₫',
                range: '100000:300000',
                selected: false
            },
            {
                name: 'Từ 300,000₫ - 500,000₫',
                range: '300000:500000',
                selected: false
            },
            {
                name: 'Từ 500,000₫ - 1,000,000₫',
                range: '500000:1000000',
                selected: false
            },
            {
                name: 'Từ 1,000,000₫ - 1,500,000₫',
                range: '1000000:1500000',
                selected: false
            },
            {
                name: 'Lớn hơn 1,500,000₫',
                range: '1500000:9999999999999',
                selected: false
            }
        ];
        this.sortList = [
            {
                name: 'Sắp xếp theo',
                range: 'auto',
                selected: true
            },
            {
                name: 'Mới nhất',
                range: 'created-descending',
                selected: false
            },
            {
                name: 'Tùy chọn',
                range: 'manual',
                selected: false
            },
            {
                name: 'Cũ nhất',
                range: 'created-ascending',
                selected: false
            },
            {
                name: 'Giá từ thấp tới cao',
                range: 'price-ascending',
                selected: false
            },
            {
                name: 'Giá từ cao tới thấp',
                range: 'price-descending',
                selected: false
            },
            {
                name: 'Theo bảng chữ cái từ A-Z',
                range: 'title-ascending',
                selected: false
            },
            {
                name: 'Theo bảng chữ cái từ Z-A',
                range: 'title-descending',
                selected: false
            },
            {
                name: 'Sản phẩm bán chạy',
                range: 'best-selling',
                selected: false
            }
        ];
        this.filterEvent = new EventEmitter();
        this.sortBy = {
            cssClass: 'sort-and-filter',
        };
    }
    ItemCollectionFilterComponent.prototype.turnOffSort = function () {
        this.sortRange = 'auto';
        console.log('this.sortRange', this.sortRange);
    };
    ItemCollectionFilterComponent.prototype.turnOffFilter = function () {
        this.filterRange = '0:max';
        console.log('this.filterRange', this.filterRange);
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ItemCollectionFilterComponent.prototype, "filterEvent", void 0);
    ItemCollectionFilterComponent = __decorate([
        Component({
            selector: 'item-collection-filter',
            templateUrl: 'item-collection-filter.html'
        }),
        __metadata("design:paramtypes", [])
    ], ItemCollectionFilterComponent);
    return ItemCollectionFilterComponent;
}());
export { ItemCollectionFilterComponent };
//# sourceMappingURL=item-collection-filter.js.map