import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, NavController, AlertController } from 'ionic-angular';
// import { DomSanitizer } from '@angular/platform-browser';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
// storage
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-item-checkout',
  templateUrl: 'item-checkout.html',
})
export class ItemCheckoutPage {
  checkoutLink:any;
  brower;
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
    public storage: Storage
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
    let variants = this.navParams.get('variants');
    console.log('variants checkout',variants);
    for(let i = 0; i <= variants.length - 1; i++){
      let item = {
        "variant_id": variants[i].variant_id,
        "title": variants[i].title,
        "vendor": variants[i].vendor,
        "quantity": variants[i].quantity
      };
      this.data_post_structor.line_items.push(item);
    }
    console.log('data', this.data_post_structor);
      
    let data_post_encode = encodeURIComponent(JSON.stringify(this.data_post_structor));
    //tao url
    let url = "https://suplo-fashion.myharavan.com/cart?data="+data_post_encode+"&view=app&themeid=1000232392";
    this.brower = this.themeBrowser.create(url,'_blank', this.options);

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
        // this.clearCart();
        this.brower.close();
      }else{
        this.brower.close();
        this.navCtrl.push(this.navCtrl.getActive().component).then(() => {
          let index = this.viewCtrl.index;
          this.navCtrl.remove(index);
        })
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
