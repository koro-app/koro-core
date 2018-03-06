import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ViewController } from 'ionic-angular';
import * as cartActions from '../../store/product-cart/product-cart.actions';

/**
 * Generated class for the ItemVariantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-variant',
  templateUrl: 'item-variant.html',
})
export class ItemVariantPage {
  options;
  variants;
  selectedIndex = 0;
  lengthOptions;
  titleVariant;
  quantity = 1;
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public store: Store<any>,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController
  	) {
    this.getData();
    this.disabledDetailOption1StockOut();
    this.selectedFirtVariant();
    if (this.lengthOptions > 1) {
      this.disabledDetailOptionNotRelative();
    }
  }

  getData(){
    this.variants = this.navParams.get('variants');
    this.options = this.navParams.get('options');
    this.lengthOptions = this.options.length;
  }

  disabledDetailOption1StockOut(){
    for(let i = 0; i <= this.variants.length - 1; i++){
      if (this.variants[i].inventory_quantity <= 0) {
        for(let j = 0; j <= this.options[0].details.length - 1; j++){
          if (this.options[0].details[j].name == this.variants[i].option1 && this.options[0].details[j].checked == false) {
            this.options[0].details[j].disabled = true;
          }
        }
        if (this.lengthOptions == 2) {
          for(let j = 0; j <= this.options[1].details.length - 1; j++){
            if (this.options[1].details[j].name == this.variants[i].option2 && this.options[1].details[j].checked == false) {
              this.options[1].details[j].disabled = true;
            }
          }
        }
        if (this.lengthOptions == 3) {
          for(let k = 1; k <= this.options.length - 1; k++){
            for(let j = 0; j <= this.options[k].details.length - 1; j++){
              if ((this.options[k].details[j].name == this.variants[i].option2 || this.options[k].details[j].name == this.variants[i].option3) && this.options[k].details[j].checked == false) {
                this.options[k].details[j].disabled = true;
              }
            }
          }
        }
      }else{
        for(let j = 0; j <= this.options[0].details.length - 1; j++){
          if (this.options[0].details[j].name == this.variants[i].option1) {
            this.options[0].details[j].disabled = false;
            this.options[0].details[j].checked = true;
          }
        }
        if (this.lengthOptions == 2) {
          for(let j = 0; j <= this.options[1].details.length - 1; j++){
            if (this.options[1].details[j].name == this.variants[i].option2) {
              this.options[1].details[j].disabled = false;
              this.options[1].details[j].checked = true;
            }
          }
        }
        if (this.lengthOptions == 3) {
          for(let k = 1; k <= this.options.length - 1; k++){
            for(let j = 0; j <= this.options[k].details.length - 1; j++){
              if (this.options[k].details[j].name == this.variants[i].option2 || this.options[k].details[j].name == this.variants[i].option3) {
                this.options[k].details[j].disabled = false;
                this.options[k].details[j].checked = true;
              }
            }
          }
        }
      }
    };
  }

  selectedFirtVariant(){
    for(let i = 0; i <= this.variants.length - 1; i++){
      if (this.variants[i].inventory_quantity > 0) {
        this.selectedIndex = i;
        this.options[0].selectedDetail = this.variants[i].option1;
        if (this.lengthOptions == 2) {
          this.options[1].selectedDetail = this.variants[i].option2;
        }
        if (this.lengthOptions == 3) {
          this.options[1].selectedDetail = this.variants[i].option2;
          this.options[2].selectedDetail = this.variants[i].option3;
        }
        break;
      }
    };
  }

  disabledDetailOptionNotRelative(){
    for(let i = 0; i <= this.variants.length - 1; i++){
      if (this.variants[i].option1 == this.options[0].selectedDetail) {
          if (this.lengthOptions == 2) {
            for(let k = 0; k <= this.options[1].details.length - 1; k++){
              if (this.options[1].details[k].name == this.variants[i].option2) {
                this.options[1].details[k].disabled = false;
                this.options[1].details[k].checked = true;
              }else{
                if (this.options[1].details[k].checked == false) {
                  this.options[1].details[k].disabled = true;
                }
              }
            }
          }else if (this.lengthOptions == 3) {
            // change option 2
            for(let k = 0; k <= this.options[1].details.length - 1; k++){
              if (this.options[1].details[k].name == this.variants[i].option2) {
                this.options[1].details[k].disabled = false;
                this.options[1].details[k].checked = true;
              }else{
                if (this.options[1].details[k].checked == false) {
                  this.options[1].details[k].disabled = true;
                }
              }
            }
            // change option 3
            for(let k = 0; k <= this.options[2].details.length - 1; k++){
              if (this.options[2].details[k].name == this.variants[i].option2) {
                this.options[2].details[k].disabled = false;
                this.options[2].details[k].checked = true;
              }else{
                if (this.options[2].details[k].checked == false) {
                  this.options[2].details[k].disabled = true;
                }
              }
            }
          }
      }
    };
  }

  selectedDetail(option,detail){
    this.options[option.position-1].selectedDetail = detail.name;
    this.resetOption23();
    if (option.position > 1) {
      this.emitVariant();
      this.selectedVariantByDetailOption23();
      this.disabledDetailOptionNotRelative();
    }else{
      this.selectedVariantByDetailOption1();
      this.disabledDetailOptionNotRelative();
    }
  }

  selectedVariantByDetailOption23(){
    for(let i = 0; i <= this.variants.length - 1; i++){
      if (this.variants[i].title == this.titleVariant) {
        this.selectedIndex = i;
        break;
      }
    };
  }
  selectedVariantByDetailOption1(){
    for(let i = 0; i <= this.variants.length - 1; i++){
      if (this.variants[i].option1 == this.options[0].selectedDetail && this.variants[i].inventory_quantity > 0) {
        this.selectedIndex = i;
        if (this.lengthOptions == 2) {
          this.options[1].selectedDetail = this.variants[i].option2;
        }
        if (this.lengthOptions == 3) {
          this.options[1].selectedDetail = this.variants[i].option2;
          this.options[2].selectedDetail = this.variants[i].option3;
        }
        break;
      }
    };
  }

  resetOption23(){
    for(let j = 0; j <= this.options.length - 1; j++){
      if (j > 0) {
        for(let k = 0; k <= this.options[j].details.length - 1; k++){
          this.options[j].details[k].disabled = false;
          this.options[j].details[k].checked = false;
        }
      }
    }
  }

  emitVariant() {
    this.titleVariant = this.options
    .map(option => option.selectedDetail)
    .join(' / ');
    console.log('this.titleVariant',this.titleVariant);
  }

  increase(variant) {
    if (this.quantity < variant.inventory_quantity){
      this.quantity++
    }else{
      this.alertNoti('Số lượng sản phẩm trong kho không đủ');
    }
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(variant) {
    if (this.quantity <= variant.inventory_quantity) {
  		// setup product title
      variant['productTitle'] = this.navParams.get('title');
  		variant['selected'] = true;
      this.store.select('cart','entities')
      .take(1)
      .subscribe((variants) => {
        if (variants[variant.id] == undefined) {
          this.store.dispatch(new cartActions.AddAction(variant, this.quantity));
          this.presentToast(`Đã thêm ${this.quantity} ${variant['productTitle']}, loại ${variant['title']} vào giỏ hàng`);
        } else {
          this.store.dispatch(new cartActions.IncreaseAction(variant, this.quantity));
          this.presentToast(`Đã tăng thêm ${this.quantity} ${variant['productTitle']}, loại ${variant['title']}`);
        }
      });
      return true;
    }else{
      this.alertNoti('Số lượng sản phẩm trong kho không đủ');
      return false;
    }
  }
  gotoCart(variant){
    if (this.addToCart(variant)) {
      this.viewCtrl.dismiss();
      this.navCtrl.push('ItemCartPage',{view: true});
    }
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  alertNoti(text){
    let noti = this.alertCtrl.create({
      message: text
    });
    noti.present();
    setTimeout(() => {
      if(noti.isOverlay){
        noti.dismiss();
      }
    }, 3000);
  }

  ionViewDidLoad() {
  }

}
