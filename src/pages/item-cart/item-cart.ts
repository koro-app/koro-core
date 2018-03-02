
import { ItemProvider } from './../../providers/item/item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
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
  itemsCart: any[];
  gross: number = 0;
  tabBarElement: any = document.querySelector('.tabbar.show-tabbar');
  isSelectedAll: boolean = true;
  clicked: boolean = false;
  selectedAllClick: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
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
        if (variant.selected == true) {
          this.gross += variant.price * variant.quantity;
        }
      })
    })
    .do((variants) => {
      console.log('variants', variants);
      this.itemsCart = variants;
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
    this.store.dispatch(new cartActions.RemoveAction(variant));
  }

  removeAll(){
    this.store.dispatch(new cartActions.RemoveAllAction());
  }

  viewProduct(handle){
    this.navCtrl.push('ItemProductPage',{handle});
  }

  // checked/unchecked khi click btn chọn tất cả
  selectAllItems(isSelectedAll:boolean) {
    isSelectedAll = isSelectedAll;
    if(isSelectedAll){
      this.itemsCart.forEach(item => {
        item.selected = true;
      });
      this.clicked = false;
    }else{
      this.itemsCart.forEach(item => {
        item.selected = false;
      });
      this.clicked = true;
    }
    /* 
    // ok with ionChange
    this.selectedAllClick = true;
    setTimeout(() => this.store.dispatch(new cartActions.SelectedAllAction(isSelectedAll)));
    */
  }

  selectItem(isSelected: boolean, index){

    console.log('isSelected first', isSelected, index);
    isSelected = !isSelected;
    // this.storage.get('itemCarts').then((data) => {
    //   this.storage.set('itemCarts', this.itemCarts);
    // });
    // this.itemsCart[index].selected = isSelected;
    console.log('isSelected after', isSelected, index);
    console.log('items', this.itemsCart);
    // setTimeout(()=>{
      if(isSelected == false){
        this.isSelectedAll = false;
        this.disableCheckout();
      }else{
        this.isSelectedAll = true;
        for (let i = 0; i <= this.itemsCart.length - 1; i++) {
          if(index !== i){
            if (this.itemsCart[i].selected == false) {
              this.isSelectedAll = false;
              break;
            }
          }
        }
      }
    // }, 300)

    /* 
    // ok with ionChange
    if (this.selectedAllClick == false) {
      this.selectedAllClick = false;
      setTimeout(() => this.store.dispatch(new cartActions.SelectedAction(variant)));
    }
    */
  }

  // check disable btn checkout?
  disableCheckout(){
    let countUncheck = 0;
    for (var i = 0; i <= this.itemsCart.length - 1; i++) {
      if (this.itemsCart[i].selected == false) {
        countUncheck++;
      }
    }
    // ko co sp nao dc chon thi disable btn checkout
    if (countUncheck == this.itemsCart.length) {
      this.clicked = true;
    }else{
      this.clicked = false;
    }
  }

  addNote(){
    let modal = this.modalCtrl.create('ItemCartNotePage');
    modal.present();
  }

  checkout() {
    // this.setNewCartsWhenCheckoutSuccess();
    this.variants.map(variants => variants.map(variant => {
      // variant =>variant.id+':'+variant.quantity)
      if (variant.selected == true) {
        return {
          variant_id: variant.id,
          title: variant.productTitle,
          vendor: variant.vendor,
          quantity: variant.quantity
        }
      }
    })
    )
    /*let newVariants: any[];
    for(let iItem = 0; iItem <= this.itemsCart.length-1; iItem++) {
      // push sp duoc chon
      if (this.itemsCart[iItem].selected == true) {
        // push từng sp trong cart
        let item = {
          "variant_id": this.itemsCart[iItem].variant.id,
          "title":this.itemsCart[iItem].title,
          "vendor": this.itemsCart[iItem].vendor,
          "quantity": this.itemsCart[iItem].quantity
        };
        console.log('itemsCart', this.itemsCart[iItem]);
        newVariants.push(this.itemsCart[iItem]);
      }
    }
    this.navCtrl.push('ItemCheckoutPage',{newVariants})*/
    .take(1)
    // .map(variants =>variants.join(','))
    // .subscribe((variants:string) =>{
    .subscribe((variants) =>{
      this.navCtrl.push('ItemCheckoutPage',{variants})
    })
    // this.variants.map(variants => variants.map(variant =>variant.id+':'+variant.quantity))
    // .take(1)
    // .map(variants =>variants.join(','))
    // .subscribe((variants:string) =>{
    //   this.navCtrl.push('ItemCheckoutPage',{variants})
    // })
  }

  setNewCartsWhenCheckoutSuccess(){
    this.store.dispatch(new cartActions.SetNewCart(this.itemsCart));
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
