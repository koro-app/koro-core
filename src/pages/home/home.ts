import { Store } from '@ngrx/store';
import { Component, ChangeDetectorRef } from '@angular/core';
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
  showToolbar:boolean = false;
  banner;
  myInput:any;
  constructor(
    public navCtrl: NavController,
    public store: Store<any>,
    public itemProvider: ItemProvider,
    public platform:Platform,
    public ref: ChangeDetectorRef
  ) {
    this.getProducts();
    this.getBanner();
  }

  onScroll($event: any){
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }
 


  getProducts() {
    this.store.dispatch(new cartActions.GetProductsAction())
  }

  checkout() {
    this.navCtrl.push('ItemCartPage', {}, {animate: true, direction: 'forward'})
  }

  onCancel() {

  }

  onInput(ev, keycode) {
    let val = ev.target.value;
    console.log('keycode',keycode);
    if (keycode == 13) {
      this.navCtrl.push('ItemSearchPage',{value:val});
    }
  }
  shouldShowCancel() {

  }

  search() {
    this.navCtrl.push('ItemSearchPage')
  }

  // get banner
  getBanner(){
    this.itemProvider.getConfig()
    .subscribe((data:any) => {
      this.banner = data.home.banner[1].src;
    });
  }

}
