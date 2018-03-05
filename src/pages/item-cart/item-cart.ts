
import { ItemProvider } from './../../providers/item/item';
import { Component, ElementRef } from '@angular/core';
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
  customBackElement: any = document.querySelector('.btn-view');
  // customBackElement: any = this.element.nativeElement.getElementsByClassName('btn-view')[0];
  isSelectedAll: boolean = true;
  clicked: boolean = false;
  selectedAllClick: boolean = false;
  viewPage = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public store: Store<any>,
    public itemProvider: ItemProvider,
    public element: ElementRef
  ) {
      if (this.navParams.get('view') == true) {
        this.viewPage = this.navParams.get('view');
      }
      this.setVariants();
  }

  dismiss(){
    this.navCtrl.parent.select(0);
  }

  setVariants() {
    this.variants = this.store.select('cart','entities')
    .map(variants => Object.keys(variants || {}).map(key => variants[key]))
    .do((variants) => {
      this.itemsCart = variants;
      this.totalPrice();
    })
  }

  totalPrice(){
    this.gross = 0;
    if (this.itemsCart != null && this.itemsCart != undefined) {
      this.itemsCart.forEach(item => {
        if(item.selected == true){
          this.gross += item.price * item.quantity;
        }
      });
    }
  }

  increase(variant) {
    this.store.dispatch(new cartActions.IncreaseAction(variant,1));
  }

  decrease(variant) {
    if (variant.quantity > 1) this.store.dispatch(new cartActions.DecreaseAction(variant,1));
  }

  remove(variant) {
    this.store.dispatch(new cartActions.RemoveAction(variant));
  }

  removeAll(){
    this.clicked = false;
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
    this.totalPrice();
  }

  selectItem(isSelected: boolean, index){
    isSelected = !isSelected;
      if(isSelected == false){
        this.isSelectedAll = false;
        this.disableCheckout();
      }else{
        this.isSelectedAll = true;
        this.clicked = false;
        for (let i = 0; i <= this.itemsCart.length - 1; i++) {
          if(index !== i){
            if (this.itemsCart[i].selected == false) {
              this.isSelectedAll = false;
              break;
            }
          }
        }
      }
    setTimeout(()=>{
        this.totalPrice();
    }, 200)
  }

  // check disable btn checkout?
  disableCheckout(){
    let countUncheck = 1;
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
    this.setNewCartsWhenCheckoutClicked();
    this.variants.map(variants => variants.map(variant => {
      if (variant.selected == true) {
        return variant
      }
    }))
    .take(1)
    .subscribe((variants) =>{
      this.navCtrl.push('ItemCheckoutPage',{variants})
    })
  }

  // changed this.variants to this.itemsCart in cart store
  setNewCartsWhenCheckoutClicked(){
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
    if (this.customBackElement != null) {
      this.customBackElement.style.display = 'inline-block';
    }
  }

  ionViewDidLoad() {
      // console.log(this.customBackElement);
    // if (this.navParams.get('view') == true && this.customBackElement != null) {
    //   this.customBackElement.style.display = 'none';
    // }
  }

}
