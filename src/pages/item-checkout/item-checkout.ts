import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, NavController, AlertController } from 'ionic-angular';
// import { DomSanitizer } from '@angular/platform-browser';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
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
  options: ThemeableBrowserOptions = {
    statusbar: {
        color: '#000000'
    },
    toolbar: {
        height: 44,
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

  constructor(
    public navParams: NavParams,
    // public sanitizer: DomSanitizer,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public themeBrowser: ThemeableBrowser,
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
    this.brower = this.themeBrowser.create(url,'_blank', this.options);
    this.actionInBrowser();
  }
  // kiem tra su kien tren browser checkout
  actionInBrowser(){
    this.brower.on("loadstop").subscribe(error =>{
      this.brower.insertCss({
        "code": "body{background-color: white;}"
      })
    })
    this.brower.on("ThemeableBrowserError").subscribe(error =>{
      console.log(error);
      this.brower.close();
    });
    // dat hang thanh cong => xoa gio hang
    this.brower.on("closePressed").subscribe(data =>{
      console.log("closePressed :  " + data.url.indexOf('thank_you'))
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
        setTimeout(() => {
          this.brower.close();
        }, 500);
      }else{
        this.brower.close();
      }
    });
    this.brower.on("loadfail").subscribe(error =>{
      console.log(error);
      this.alertNoti("Kiểm tra lại kết nối!");
      this.brower.close();
    });
    this.brower.on("unexpected").subscribe(error =>{
      console.log(error);
      this.brower.close();
    });
    this.brower.on("undefined").subscribe(error =>{
      console.log(error);
      this.brower.close();
    });
    this.brower.on("ThemeableBrowserWarning").subscribe(error =>{
      console.log(error);
    });
    this.brower.on("critical").subscribe(error =>{
      console.log(error);
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
