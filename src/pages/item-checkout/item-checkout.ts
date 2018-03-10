import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, NavController, AlertController } from 'ionic-angular';
// import { DomSanitizer } from '@angular/platform-browser';
// storage
import { Storage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as cartActions from '../../store/product-cart/product-cart.actions';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

@IonicPage()
@Component({
  selector: 'page-item-checkout',
  templateUrl: 'item-checkout.html',
})
export class ItemCheckoutPage {
  checkoutLink:any;
  brower;
  variants;
  // checkout
  public data_post_structor = {
   "line_items":[],
   "note": "",
   "full_name": "",
   "email": "",
   "phone": "",
   "address": "",
   "province_id": null,
  };
  options = {
    statusbar: {
        color: '#000000'
    },
    toolbar: {
        height: 56,
        color: '#000000'
    },
    title: {
        color: '#ffffff',
        staticText: 'Thanh toán đơn hàng'
    },
    closeButton:{
      wwwImage: 'assets/icon/back.png',
      align: 'left',
      event: 'closePressed'
    },
    // clearcache: true,
    // clearsessioncache: true,
    backButtonCanClose: true
  };
  cssVariable: string = `
  #haravan-notification {
    display:none !important;
  }`;

  constructor(
    public navParams: NavParams,
    // public sanitizer: DomSanitizer,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public storage: Storage,
    public store: Store<any>
  ) {
    // let variants = this.navParams.get('variants');
    // this.checkoutLink = 'https://suplo-fashion.myharavan.com/cart/' + variants;
    // console.log('variants string',this.checkoutLink)
    // this.checkoutLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.checkoutLink)
    this.directCheckout();
  }
  
  frameLoad() {

  }

  directCheckout(){
    
    this.storage.get('noteToCart').then((note) => {
      this.data_post_structor.note = note;
    });
    this.variants = this.navParams.get('variants');
    for(let i = 0; i <= this.variants.length - 1; i++){
      if (this.variants[i] != null && this.variants[i] != undefined) {
        let item = {
          "variant_id": this.variants[i].id,
          "title": this.variants[i].productTitle,
          "vendor": this.variants[i].vendor,
          "quantity": this.variants[i].quantity
        };
        this.data_post_structor.line_items.push(item);
      }
    }
      
    let data_post_encode = encodeURIComponent(JSON.stringify(this.data_post_structor));
    //tao url
    let url = "https://suplo-fashion.myharavan.com/cart?data="+data_post_encode+"&view=app&themeid=1000232392";
    this.brower = cordova.ThemeableBrowser.open(url,'_blank', this.options);
    this.actionInBrowser();
  }
  // kiem tra su kien tren browser checkout
  actionInBrowser(){
    this.brower.addEventListener('backPressed', function(e) {
    })
    .addEventListener('helloPressed', function(e) {
    })
    .addEventListener('loadstop', (data) =>  {
      this.brower.insertCss({
        code: this.cssVariable
      },() => {})
    })
    .addEventListener('sharePressed', function(e) {
        // alert(e.url);
    })
    .addEventListener('loadfail', function(e) {
      this.alertNoti("Kiểm tra lại kết nối!");
    })
    // dat hang thanh cong => xoa gio hang
    .addEventListener('closePressed', (data) => {
       if(data.url.indexOf('thank_you') !== -1){
        this.removeItemWhenCheckoutSuccess();
        // this.navCtrl.setRoot('ItemCartPage').then(() => {
        //   let index = this.viewCtrl.index - 1;
        //   console.log
        //   this.navCtrl.remove(index);
        // })
        // this.navCtrl.setRoot('ItemCartPage');
        // this.navCtrl.push(this.navCtrl.getActive().component).then(() => {
        //   let index = this.viewCtrl.index;
        //   this.navCtrl.remove(index);
        // })
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
        // setTimeout(() => {
          this.brower.close();
        // }, 500);
      }else{
        this.brower.close();
      }
    })
    .addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
        console.error(e.message);
    })
    .addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
        console.log(e.message);
    });
  }

  // when checkout success, remove item has selected = true
  removeItemWhenCheckoutSuccess(){
    for(let i = 0; i <= this.variants.length - 1; i++){
      if (this.variants[i] != null && this.variants[i] != undefined) {
        console.log(this.variants[i]);
        this.store.dispatch(new cartActions.RemoveAction(this.variants[i]));
      }
    };
    setTimeout(() => {
      // this.navCtrl.push(this.navCtrl.getActive().component).then(() => {
      //   let index = this.viewCtrl.index;
      //   this.navCtrl.remove(index);
      // })
    }, 3000);
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
  ionViewDidEnter() {
    this.navCtrl.pop();
  }
}
