import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as seenProductActions from '../../store/seen-product/seen-product.actions';

/**
 * Generated class for the ItemSeenProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-seen-product',
  templateUrl: 'item-seen-product.html',
})
export class ItemSeenProductPage {
  seenProducts;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public store: Store<any>
  	) {
  	this.getSeenProduct();
  }

  getSeenProduct(){
    this.seenProducts = this.store.select('seenProduct', 'entities')
    .map(products => Object.keys(products || {}).map(key => products[key]))
    .do((products) => {
      console.log('products', products);
    })
  }

  viewProduct(handle){
	this.navCtrl.push('ItemProductPage',{handle: handle});
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ItemSeenProductPage');
  }

}
