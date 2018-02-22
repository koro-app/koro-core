import { Store } from '@ngrx/store';
import { ItemCollectionPage } from './../item-collection/item-collection';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';

@IonicPage()
@Component({
  selector: 'page-item-search',
  templateUrl: 'item-search.html',
})
export class ItemSearchPage extends ItemCollectionPage {
  myInput:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public itemProvider: ItemProvider,
    public store: Store<any>,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    super(
      navCtrl,
      itemProvider,
      navParams,
      store,
      loadingCtrl,
      toastCtrl
    )
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ItemSearchPage');
  }

  onCancel() {

  }

  setPageName() {
    // we dont do this, so let it empty
  }

  getProducts() {
    // we dont do this, so let it empty
  }

  onInput(ev) {
    let val = ev.target.value;
    this.itemProvider.searchString(val)
    .take(1)
    .debounceTime(500)
    .subscribe((data:{products:any[],paginate:any}) => {
      data.products.map((product) => {
        if ((<string>product.featured_image).startsWith('//')) {
          product['featured_image'] = 'https:' + product.featured_image;
        }
        return product;
      })
      this.products = data.products;
      this.paginate = data.paginate;
    })
  }

  shouldShowCancel() {

  }

  back() {
    this.viewCtrl.dismiss();
  }
}
