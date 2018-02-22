import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { NavController, IonicPage, Platform } from 'ionic-angular';
import * as cartActions from '../../store/product-cart/product-cart.actions'
import 'rxjs/add/operator/do'
import { ItemProvider } from '../../providers/item/item';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  productNumber: Observable<any>;
  constructor(
    public navCtrl: NavController,
    public store: Store<any>,
    public itemProvider: ItemProvider,
    public platform:Platform
  ) {
    this.getProducts();
    this.getProductNumber();
  }
  
  getProductNumber() {
    // this.productNumber = this.store.select('cart','ids')
    // .map(ids => ids.length)
    this.productNumber = this.store.select('cart','ids')
    .map(ids => ids.length)
    // .do(data => console.log('update badge',data))
  }

  getProducts() {
    this.store.dispatch(new cartActions.GetProductsAction())
  }

  checkout() {
    this.navCtrl.push('ItemCartPage', {}, {animate: true, direction: 'forward'})
  }

  search() {
    this.navCtrl.push('ItemSearchPage')
  }

}
