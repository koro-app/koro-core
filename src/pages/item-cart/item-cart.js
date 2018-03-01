var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ItemProvider } from './../../providers/item/item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import * as cartActions from '../../store/product-cart/product-cart.actions';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
var ItemCartPage = /** @class */ (function () {
    function ItemCartPage(navCtrl, navParams, store, itemProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.store = store;
        this.itemProvider = itemProvider;
        this.gross = 0;
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.isSelectedAll = true;
        this.clicked = false;
        this.setVariants();
    }
    ItemCartPage.prototype.dismiss = function () {
        this.navCtrl.parent.select(0);
    };
    ItemCartPage.prototype.setVariants = function () {
        var _this = this;
        this.variants = this.store.select('cart', 'entities')
            .map(function (variants) { return Object.keys(variants || {}).map(function (key) { return variants[key]; }); })
            .do(function (variants) {
            _this.gross = 0;
            variants.map(function (variant) {
                _this.gross += variant.price * variant.quantity;
            });
        })
            .do(function (variants) {
            console.log('variants', variants);
        });
    };
    ItemCartPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad ItemCheckoutPage');
    };
    ItemCartPage.prototype.increase = function (variant) {
        this.store.dispatch(new cartActions.IncreaseAction(variant));
    };
    ItemCartPage.prototype.decrease = function (variant) {
        if (variant.quantity != 1)
            this.store.dispatch(new cartActions.DecreaseAction(variant));
    };
    ItemCartPage.prototype.select = function () {
    };
    ItemCartPage.prototype.remove = function (variant) {
        this.store.dispatch(new cartActions.RemoveAction(variant));
    };
    ItemCartPage.prototype.removeAll = function () {
        this.store.dispatch(new cartActions.RemoveAllAction());
    };
    ItemCartPage.prototype.viewProduct = function (handle) {
        this.navCtrl.push('ItemProductPage', { handle: handle });
    };
    // checked/unchecked khi click btn chọn tất cả
    ItemCartPage.prototype.selectAllItems = function (isSelectedAll) {
        isSelectedAll = isSelectedAll;
        if (isSelectedAll) {
            // this.itemCarts.forEach(item => {
            //   item.selected = true;
            // });
            // this.clicked = false;
        }
        else {
            // this.itemCarts.forEach(item => {
            //   item.selected = false;
            // });
        }
        this.disableCheckout();
    };
    // check disable btn checkout?
    ItemCartPage.prototype.disableCheckout = function () {
        var countUncheck = 0;
        // for (var i = 0; i <= this.variants.length - 1; i++) {
        //   if (this.variants[i].selected == false) {
        //     countUncheck++;
        //   }
        // }
        // ko co sp nao dc chon thi disable btn checkout
        // if (countUncheck == this.itemCarts.length) {
        //   this.clicked = true;
        // }else{
        //   this.clicked = false;
        // }
    };
    ItemCartPage.prototype.checkout = function () {
        var _this = this;
        this.variants.map(function (variants) { return variants.map(function (variant) {
            // variant =>variant.id+':'+variant.quantity)
            //   (variant) => {
            //     if (variant.selected == true) {
            //     return
            //       {
            //         "variant_id"+':'+variant.id,
            //         "title"+':'+variant.productTitle,
            //         "vendor"+':'+variant.productTitle,
            //         "quantity"+':'+variant.quantity
            //       }
            //     }
            //     console.log('')
            //   }
            if (variant.selected == true) {
                return {
                    variant_id: variant.id,
                    title: variant.productTitle,
                    vendor: variant.vendor,
                    quantity: variant.quantity
                };
            }
        }); })
            .take(1)
            .subscribe(function (variants) {
            _this.navCtrl.push('ItemCheckoutPage', { variants: variants });
        });
        // this.variants.map(variants => variants.map(variant =>variant.id+':'+variant.quantity))
        // .take(1)
        // .map(variants =>variants.join(','))
        // .subscribe((variants:string) =>{
        //   this.navCtrl.push('ItemCheckoutPage',{variants})
        // })
    };
    // hide tabbartabroot cart
    ItemCartPage.prototype.ionViewWillEnter = function () {
        if (this.tabBarElement != null) {
            this.tabBarElement.style.display = 'none';
        }
    };
    // show normail tabbar
    ItemCartPage.prototype.ionViewWillLeave = function () {
        if (this.tabBarElement != null) {
            this.tabBarElement.style.display = 'flex';
        }
    };
    ItemCartPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-item-cart',
            templateUrl: 'item-cart.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Store,
            ItemProvider])
    ], ItemCartPage);
    return ItemCartPage;
}());
export { ItemCartPage };
//# sourceMappingURL=item-cart.js.map