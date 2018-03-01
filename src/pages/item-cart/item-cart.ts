
import { ItemProvider } from './../../providers/item/item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as cartActions from '../../store/product-cart/product-cart.actions';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

@IonicPage()
@Component({
  selector: 'page-item-cart',
  templateUrl: 'item-cart.html',
})
export class ItemCartPage {
  variants: Observable<any>;
  gross: number = 0;
  tabBarElement: any = document.querySelector('.tabbar.show-tabbar');
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public store: Store<any>,
    public itemProvider: ItemProvider
  ) {
      
      this.setVariants();
  }

  dismiss(){
    this.navCtrl.parent.select(0);
  }

  setVariants() {
    this.variants = this.store.select('cart','entities')
    .map(variants => Object.keys(variants || {}).map(key => variants[key]))
    .do((variants:any[]) => {
      this.gross = 0;
      variants.map(variant => {
        this.gross += variant.price * variant.quantity;
      })
    })
    .do((variants) => {
      console.log('variants', variants);
    })
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ItemCheckoutPage');
  }

  increase(variant) {
    this.store.dispatch(new cartActions.IncreaseAction(variant))
  }

  decrease(variant) {
    if (variant.quantity != 1) this.store.dispatch(new cartActions.DecreaseAction(variant))
  }

  select(){
    
  }

  remove(variant) {
    this.store.dispatch(new cartActions.RemoveAction(variant))
  }

  removeAll(){
    this.store.dispatch(new cartActions.RemoveAllAction());
  }

  viewProduct(handle){
    this.navCtrl.push('ItemProductPage',{handle});
  }

  checkout() {
    this.variants.map(variants => variants.map(variant =>variant.id+':'+variant.quantity))
    .take(1)
    .map(variants =>variants.join(','))
    .subscribe((variants:string) =>{
      this.navCtrl.push('ItemCheckoutPage',{variants})
    })
  }

  // hide tabbartabroot cart
  ionViewWillEnter() {
    if (this.tabBarElement != null) {
      this.tabBarElement.style.display = 'none';
    }
  }

  // show normail tabbar
  ionViewWillLeave() {
    if (this.tabBarElement != null) {
      this.tabBarElement.style.display = 'flex';
    }
  }

}
