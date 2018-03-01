var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as cartActions from '../../store/product-cart/product-cart.actions';
/**
 * Generated class for the ItemVariantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ItemVariantPage = /** @class */ (function () {
    function ItemVariantPage(navCtrl, navParams, store, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.store = store;
        this.toastCtrl = toastCtrl;
        this.selectedIndex = 0;
        this.first1 = true;
        this.indexOption = 0;
        this.indexDetailStockIn = 0;
        this.indexDetailStockInFollow = 0;
        this.indexVariantStockIn = 0;
        // public listOptionStockOut = {
        // 	"OptionStockOut": []
        // };
        this.listOptionStockOut = [];
        this.getFirstVariant();
        this.checkVariantStockIn();
        this.checkDetail();
        this.findVariantStockOut();
        this.disableOption1StockOut();
        this.emitVariant();
        // this.selectedVariant(this.options[0],this.options[0].details[this.indexDetailStockIn],this.indexDetailStockIn);
    }
    // first
    ItemVariantPage.prototype.findVariantStockOut = function () {
        for (var i = 0; i <= this.variants.length - 1; i++) {
            var duplicate = false;
            if (this.variants[i].inventory_quantity <= 0) {
                if (this.listOptionStockOut != null && this.listOptionStockOut != undefined && this.listOptionStockOut.length > 0) {
                    for (var j = 0; j <= this.listOptionStockOut.length - 1; j++) {
                        if (this.listOptionStockOut[j] == this.variants[i].option1) {
                            duplicate = true;
                            break;
                        }
                    }
                }
                if (duplicate == false) {
                    this.listOptionStockOut.push(this.variants[i].option1);
                }
            }
            else {
                if (this.listOptionStockOut != null && this.listOptionStockOut != undefined && this.listOptionStockOut.length > 0) {
                    for (var j = 0; j <= this.listOptionStockOut.length - 1; j++) {
                        if (this.listOptionStockOut[j] == this.variants[i].option1) {
                            this.listOptionStockOut.splice(this.variants[i].option1, 1);
                        }
                    }
                }
            }
        }
    };
    ItemVariantPage.prototype.disableOption1StockOut = function () {
        var indexFirstOption1 = 0;
        for (var z = 0; z <= this.options[0].details.length - 1; z++) {
            if (this.listOptionStockOut != null && this.listOptionStockOut != undefined && this.listOptionStockOut.length > 0) {
                for (var j = 0; j <= this.listOptionStockOut.length - 1; j++) {
                    if (this.listOptionStockOut[j] == this.options[0].details[z].name) {
                        this.options[0].details[z].disabled = true;
                    }
                    else {
                        indexFirstOption1 = z;
                    }
                }
            }
        }
        this.firstSelectedVariant(this.options[0].details[indexFirstOption1]);
    };
    ItemVariantPage.prototype.firstSelectedVariant = function (detail) {
        var canFind1 = false;
        for (var i = 0; i <= this.variants.length - 1; i++) {
            if (this.variants[i].inventory_quantity > 0) {
                canFind1 = true;
                this.selectedIndex = i;
                this.options[0].selectedDetail = detail.name;
                break;
            }
        }
        for (var i = 0; i <= this.variants.length - 1; i++) {
            console.log('detail.name', detail.name);
            if (detail.name == this.variants[i].option1) {
                for (var j = 1; j <= this.options.length - 1; j++) {
                    for (var z = 0; z <= this.options[j].details.length - 1; z++) {
                        if (this.variants[i].inventory_quantity > 0 && this.options[j].details[z].name == this.variants[i].option2 || this.options[j].details[z].name == this.variants[i].option3) {
                            this.options[j].selectedDetail = this.options[j].details[z].name;
                            this.options[j].details[z].disabled = false;
                            this.options[j].details[z].checked = true;
                            this.titleOptionSelected = this.options[j].details[z].name;
                            // console.log('canfind', canFind2);
                        }
                        else {
                            // console.log('canfind2', canFind2);
                            if (this.options[j].details[z].checked == false) {
                                this.options[j].details[z].disabled = true;
                            }
                            // if (this.options[j].details.length - 1 == z && canFind2 == false) {
                            // 	this.options[j].details[indexDetail2].disabled = false;
                            // }
                        }
                        console.log(this.options[j].details[z].name, this.options[j].details[z].disabled);
                    }
                }
            }
        }
    };
    ItemVariantPage.prototype.addToCart = function (variant) {
        var _this = this;
        // setup product title
        variant['productTitle'] = this.navParams.get('title');
        variant['selected'] = true;
        console.log('title', this.navParams.get('title'));
        this.store.select('cart', 'entities')
            .take(1)
            .subscribe(function (variants) {
            // let variant = this.getVariantByTitle(product,product.selectedVariant);
            if (variants[variant.id] == undefined) {
                _this.store.dispatch(new cartActions.AddAction(variant));
                _this.presentToast("\u0110\u00E3 th\u00EAm s\u1EA3n ph\u1EA9m v\u00E0o gi\u1ECF h\u00E0ng");
            }
            else {
                _this.store.dispatch(new cartActions.IncreaseAction(variant));
                _this.presentToast("\u0110\u00E3 gia t\u0103ng th\u00EAm 1 s\u1EA3n ph\u1EA9m n\u00E0y");
            }
        });
    };
    ItemVariantPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000
        });
        toast.present();
    };
    ItemVariantPage.prototype.getFirstVariant = function () {
        this.variants = this.navParams.get('variants');
        this.options = this.navParams.get('options');
    };
    ItemVariantPage.prototype.checkVariantStockIn = function () {
        for (var i = 0; i <= this.variants.length - 1; i++) {
            if (this.variants[i].inventory_quantity > 0) {
                this.indexVariantStockIn = i;
                this.titleOptionSelected = this.variants[this.indexVariantStockIn].option2;
                console.log(this.indexVariantStockIn, this.variants[this.indexVariantStockIn].option2);
                break;
            }
        }
    };
    ItemVariantPage.prototype.selectedDetail = function (option, detail, num) {
        this.first1 = false;
        this.options[option.position - 1].selectedDetail = detail.name;
        this.emitVariant();
        this.selectedVariant(option, detail, num);
    };
    ItemVariantPage.prototype.emitVariant = function () {
        this.titleVariant = this.options
            .map(function (option) { return option.selectedDetail; })
            .join(' / ');
        console.log('this.titleVariant', this.titleVariant);
    };
    ItemVariantPage.prototype.selectedVariant = function (option, detail, num) {
        var canFind1 = false;
        for (var i = 0; i <= this.variants.length - 1; i++) {
            // if(this.variants[i].inventory_quantity > 0){
            // 	this.indexVariantStockIn = i;
            // }
            if (this.variants[i].inventory_quantity > 0 && (detail.name == this.variants[i].option1 || detail.name == this.variants[i].option2 || detail.name == this.variants[i].option3)) {
                canFind1 = true;
                this.selectedIndex = i;
                console.log('this.variants[i]', i, this.variants[i].inventory_quantity, this.variants[i].option1, this.selectedIndex);
                break;
            }
            // else if(canFind1 == false && i == this.variants.length - 1){
            // 	this.selectedIndex = this.indexVariantStockIn;
            // 	// this.titleOptionSelected = this.variants[this.indexVariantStockIn].option2;
            // 	console.log('this.variants[i]',i,this.variants[i].inventory_quantity,this.variants[i].option1,this.selectedIndex,this.indexVariantStockIn);
            // 	break;
            // }
        }
        this.selectDetailFollow(option, detail);
    };
    ItemVariantPage.prototype.checkDetail = function () {
        // let indexFirstOption1 = 0;
        for (var z = 0; z <= this.options[0].details.length - 1; z++) {
            if (this.titleOptionSelected == this.options[0].details[z].name) {
                this.indexDetailStockIn = z;
                console.log(this.indexDetailStockIn, this.options[0].details[z].name);
                break;
            }
        }
        // this.firstSelectedVariant(this.options[0].details[this.indexDetailStockIn]);
    };
    ItemVariantPage.prototype.selectDetailFollow = function (option, detail) {
        if (option.position - 1 == 0) {
            this.resetOptions();
            for (var i = 0; i <= this.variants.length - 1; i++) {
                if (detail.name == this.variants[i].option1) {
                    for (var j = 0; j <= this.options.length - 1; j++) {
                        if (option.position - 1 != j) {
                            for (var z = 0; z <= this.options[j].details.length - 1; z++) {
                                if (this.variants[i].inventory_quantity > 0 && this.options[j].details[z].name == this.variants[i].option2 || this.options[j].details[z].name == this.variants[i].option3) {
                                    this.options[j].details[z].disabled = false;
                                    this.options[j].details[z].checked = true;
                                    this.titleOptionSelected = this.options[j].details[z].name;
                                    this.options[j].selectedDetail = this.options[j].details[z].name;
                                }
                                else {
                                    if (this.options[j].details[z].checked == false) {
                                        this.options[j].details[z].disabled = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    ItemVariantPage.prototype.resetOptions = function () {
        for (var j = 0; j <= this.options.length - 1; j++) {
            for (var z = 1; z <= this.options[j].details.length - 1; z++) {
                this.options[j].details[z].disabled = false;
                this.options[j].details[z].checked = false;
            }
        }
    };
    ItemVariantPage.prototype.getVariantByTitle = function (product, title) {
        var variant = product.variants.filter(function (variant) { return variant.title == title; })[0];
        //setup default featured image
        variant['default_featured_image'] = product.featured_image;
        // setup product title
        variant['productTitle'] = product.title;
        return variant;
    };
    ItemVariantPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad ItemVariantPage');
    };
    ItemVariantPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-item-variant',
            templateUrl: 'item-variant.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Store,
            ToastController])
    ], ItemVariantPage);
    return ItemVariantPage;
}());
export { ItemVariantPage };
//# sourceMappingURL=item-variant.js.map