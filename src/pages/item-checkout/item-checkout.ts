import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';


@IonicPage()
@Component({
  selector: 'page-item-checkout',
  templateUrl: 'item-checkout.html',
})
export class ItemCheckoutPage {
  checkoutLink:any;

  // checkout
  public data_post_structor = {
   "line_items":[],
   "full_name": "",
   "email": "",
   "phone": "",
   "address": "",
   "province_id": null,
  };
  options2: ThemeableBrowserOptions = {
    statusbar: {
        color: '#db3235'
    },
    toolbar: {
        height: 44,
        color: '#db3235'
    },
    title: {
        color: '#ffffff',
        staticText: 'Thanh toán đơn hàng'
    },
    closeButton:{
      // wwwImage: 'assets/icon/back.png',
      align: 'left',
      event: 'closePressed'
    },
    // clearcache: true,
    // clearsessioncache: true,
    backButtonCanClose: true
  };

  constructor(
    public navParams: NavParams,
    public sanitizer: DomSanitizer,
    public themeBrowser: ThemeableBrowser
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
      let variants = this.navParams.get('variants');
      this.data_post_structor.line_items.push(variants);
      console.log('variants',variants);
      
      let data_post_encode = encodeURIComponent(JSON.stringify(this.data_post_structor));
      //tao url
      let url = "https://suplo-fashion.myharavan.com/cart?data="+data_post_encode+"&view=app&themeid=1000232392";
      // this.checkoutLink = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      let brower = this.themeBrowser.create(url,'_blank', this.options2);
  }
}
