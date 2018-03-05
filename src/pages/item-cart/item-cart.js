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
import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import * as cartActions from '../../store/product-cart/product-cart.actions';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
var ItemCartPage = /** @class */ (function () {
    function ItemCartPage(navCtrl, navParams, modalCtrl, store, itemProvider, element) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.store = store;
        this.itemProvider = itemProvider;
        this.element = element;
        this.gross = 0;
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.customBackElement = document.querySelector('.btn-view');
        // customBackElement: any = this.element.nativeElement.getElementsByClassName('btn-view')[0];
        this.isSelectedAll = true;
        this.clicked = false;
        this.selectedAllClick = false;
        this.viewPage = false;
        if (this.navParams.get('view') == true) {
            this.viewPage = this.navParams.get('view');
        }
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
            _this.itemsCart = variants;
            _this.totalPrice();
        });
    };
    ItemCartPage.prototype.totalPrice = function () {
        var _this = this;
        this.gross = 0;
        if (this.itemsCart != null && this.itemsCart != undefined) {
            this.itemsCart.forEach(function (item) {
                if (item.selected == true) {
                    _this.gross += item.price * item.quantity;
                }
            });
        }
    };
    ItemCartPage.prototype.increase = function (variant) {
        this.store.dispatch(new cartActions.IncreaseAction(variant, 1));
    };
    ItemCartPage.prototype.decrease = function (variant) {
        if (variant.quantity > 1)
            this.store.dispatch(new cartActions.DecreaseAction(variant, 1));
    };
    ItemCartPage.prototype.remove = function (variant) {
        this.store.dispatch(new cartActions.RemoveAction(variant));
    };
    ItemCartPage.prototype.removeAll = function () {
        this.clicked = false;
        this.store.dispatch(new cartActions.RemoveAllAction());
    };
    ItemCartPage.prototype.viewProduct = function (handle) {
        this.navCtrl.push('ItemProductPage', { handle: handle });
    };
    // checked/unchecked khi click btn chọn tất cả
    ItemCartPage.prototype.selectAllItems = function (isSelectedAll) {
        isSelectedAll = isSelectedAll;
        if (isSelectedAll) {
            this.itemsCart.forEach(function (item) {
                item.selected = true;
            });
            this.clicked = false;
        }
        else {
            this.itemsCart.forEach(function (item) {
                item.selected = false;
            });
            this.clicked = true;
        }
        this.totalPrice();
    };
    ItemCartPage.prototype.selectItem = function (isSelected, index) {
        var _this = this;
        isSelected = !isSelected;
        if (isSelected == false) {
            this.isSelectedAll = false;
            this.disableCheckout();
        }
        else {
            this.isSelectedAll = true;
            this.clicked = false;
            for (var i = 0; i <= this.itemsCart.length - 1; i++) {
                if (index !== i) {
                    if (this.itemsCart[i].selected == false) {
                        this.isSelectedAll = false;
                        break;
                    }
                }
            }
        }
        setTimeout(function () {
            _this.totalPrice();
        }, 200);
    };
    // check disable btn checkout?
    ItemCartPage.prototype.disableCheckout = function () {
        var countUncheck = 1;
        for (var i = 0; i <= this.itemsCart.length - 1; i++) {
            if (this.itemsCart[i].selected == false) {
                countUncheck++;
            }
        }
        // ko co sp nao dc chon thi disable btn checkout
        if (countUncheck == this.itemsCart.length) {
            this.clicked = true;
        }
        else {
            this.clicked = false;
        }
    };
    ItemCartPage.prototype.addNote = function () {
        var modal = this.modalCtrl.create('ItemCartNotePage');
        modal.present();
    };
    ItemCartPage.prototype.checkout = function () {
        var _this = this;
        this.setNewCartsWhenCheckoutClicked();
        this.variants.map(function (variants) { return variants.map(function (variant) {
            if (variant.selected == true) {
                return variant;
            }
        }); })
            .take(1)
            .subscribe(function (variants) {
            _this.navCtrl.push('ItemCheckoutPage', { variants: variants });
        });
    };
    // changed this.variants to this.itemsCart in cart store
    ItemCartPage.prototype.setNewCartsWhenCheckoutClicked = function () {
        this.store.dispatch(new cartActions.SetNewCart(this.itemsCart));
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
        if (this.customBackElement != null) {
            this.customBackElement.style.display = 'inline-block';
        }
    };
    ItemCartPage.prototype.ionViewDidLoad = function () {
        // console.log(this.customBackElement);
        // if (this.navParams.get('view') == true && this.customBackElement != null) {
        //   this.customBackElement.style.display = 'none';
        // }
    };
    ItemCartPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-item-cart',
            templateUrl: 'item-cart.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ModalController,
            Store,
            ItemProvider,
            ElementRef])
    ], ItemCartPage);
    return ItemCartPage;
}());
export { ItemCartPage };
//# sourceMappingURL=item-cart.js.map