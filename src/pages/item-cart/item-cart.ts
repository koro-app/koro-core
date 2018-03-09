
import { ItemProvider } from './../../providers/item/item';
import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController} from 'ionic-angular';
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
  lengthVariants: number = 0;
  gross: number = 0;
  countUncheck: number = 0;
  countCheck: number = 0;
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
    public alertCtrl: AlertController,
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
      this.gross = 0;
      this.countUncheck = 0;
      this.countCheck = 0;
      this.lengthVariants = variants.length;
      this.clicked = true;
      variants.map(variant => {
        // tinh tong tien variant nao selected
        if (variant.selected == true) {
          this.gross += variant.price * variant.quantity;
        }
        // dem so variant unselected
        if (variant.selected == false) {
          this.countUncheck++;
        }else{
          this.countCheck++;
        }
      })
        // neu so variant unselected = so variant co trong variants => disabled btn checkout (clicked = true)
      this.disableCheckout();
      this.checkSelectedAll();
    })
  }

  increase(variant) {
    this.store.dispatch(new cartActions.IncreaseAction(variant,1));
  }

  decrease(variant) {
    if (variant.quantity > 1) this.store.dispatch(new cartActions.DecreaseAction(variant,1));
  }

  remove(variant) {
    let confirm = this.alertCtrl.create({
        message: 'Xóa sản phẩm này khỏi giỏ hàng?',
        buttons: [
          {
            text: 'Không',
            handler: () => {
            }
          },
          {
            text: 'Xóa',
            handler: () => {
              this.store.dispatch(new cartActions.RemoveAction(variant));
            }
          }
        ]
      });
    confirm.present();
  }

  removeAll(){
    let confirm = this.alertCtrl.create({
        message: 'Xóa tất cả sản phẩm khỏi giỏ hàng?',
        buttons: [
          {
            text: 'Không',
            handler: () => {
            }
          },
          {
            text: 'Xóa tất cả',
            handler: () => {
              this.clicked = false;
              this.store.dispatch(new cartActions.RemoveAllAction());
            }
          }
        ]
      });
    confirm.present();
  }

  viewProduct(handle){
    this.navCtrl.push('ItemProductPage',{handle});
  }

  // checked/unchecked khi click btn chọn tất cả
  selectAllItems(valueSelectedAll:boolean) {
    this.selectedAllClick = true;
    setTimeout(() => this.store.dispatch(new cartActions.SelectedAllAction(!valueSelectedAll)));
  }

  clickedItem( value:boolean){
    this.selectedAllClick = false;
  }

  selectItem(variant, value:boolean){
    setTimeout(() => {
      if (this.selectedAllClick == false) {
        this.store.dispatch(new cartActions.SelectedAction(variant, value))
      }
    });
  }

  // check disabled btn checkout?
  disableCheckout(){
    // ko co sp nao dc chon thi disable btn checkout
    if (this.countUncheck == this.lengthVariants) {
      this.clicked = true;
    }else{
      this.clicked = false;
    }
  }

  // check SelectedAll?
  checkSelectedAll(){
    if (this.selectedAllClick == false) {
      if (this.countCheck == this.lengthVariants) {
        this.isSelectedAll = true;
      }else{
        this.isSelectedAll = false;
      }
    }
  }

  addNote(){
    let modal = this.modalCtrl.create('ItemCartNotePage');
    modal.present();
  }

  checkout() {
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
  ionViewDidEnter() {
    // this.navCtrl.pop();
  }

}
