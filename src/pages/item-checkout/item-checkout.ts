import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-item-checkout',
  templateUrl: 'item-checkout.html',
})
export class ItemCheckoutPage {
  checkoutLink:any;

  constructor(
    public navParams: NavParams,
    public sanitizer: DomSanitizer
  ) {
    let variants = this.navParams.get('variants');
    this.checkoutLink = 'https://suplo-food.myharavan.com/cart/' + variants;
    console.log('variants string',this.checkoutLink)
    this.checkoutLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.checkoutLink)
  }
  
  frameLoad() {

  }
}
