import { ItemProvider } from './../../providers/item/item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/take';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Store } from '@ngrx/store';
import * as cartActions from '../../store/product-cart/product-cart.actions'
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-item-collection',
  templateUrl: 'item-collection.html',
})
export class ItemCollectionPage {
  pageName: string = "";
  collections: any;
  paginate: any;
  products:any[] = [];

  constructor(
    public navCtrl: NavController, 
    public itemProvider: ItemProvider,
    public navParams: NavParams,
    public store: Store<any>,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {

    this.setPageName();
    this.getProducts();
    
  }

  setPageName() {
    this.pageName = this.navParams.get('title');
  }

  startLoading() {
    // start loading
    let loading = this.loadingCtrl.create({
      content: 'Đang tải dữ liệu...'
    });
    loading.present();
    return loading;
  }

  getProducts() {
    let loading = this.startLoading();

    this.collections = this.itemProvider
    .getProducts(this.navParams.get('handle'))
    .take(1)
    .subscribe((data:{products:any[],paginate:any}) => {
      data.products.map((product) => {
        if ((<string>product.featured_image).startsWith('//')) {
          product['featured_image'] = 'https:' + product.featured_image;
        }
        return product;
      })
      this.products = data.products;
      this.paginate = data.paginate;
      loading.dismiss();
    })
  }

  ionViewDidLoad() {
  }

  goDetail(handle) {
    this.navCtrl.push('ItemProductPage',{handle})
  }

  addToCart(collectionProduct) {
    let entities$ = this.store.select('cart','entities').take(1)
    let productVariant$ = this.normalizeItem(collectionProduct);
    combineLatest(entities$,productVariant$,(variants,{product,variant}) =>{
      if (variants[variant.id] == undefined || variants[variant.id].selectedVariant != variant.selectedVariant) {
        this.store.dispatch(new cartActions.AddAction(variant));
        this.presentToast(`Đã thêm ${product.title} loại ${variant.title}`);
      } else {
        this.store.dispatch(new cartActions.IncreaseAction(variant));
        this.presentToast(`Tăng 1 sản phẩm ${product.title} bản ${variant.title}`);
      }
      console.log('product '+JSON.stringify(product));
      console.log('variants '+JSON.stringify(variants));
      console.log('collectionProduct '+JSON.stringify(collectionProduct));
    })
    .subscribe();
  }

  normalizeItem(collectionProduct) {
    return this.itemProvider
    .getProduct(collectionProduct.handle).take(1)
    .map((product:any) =>{
      let variant = product.variants[0];
      //setup default featured image
      variant['default_featured_image'] = product.featured_image;
      // setup product title
      variant['productTitle'] = product.title;
      return {product,variant}
    })
  
  }

  changeFilter(filter:string) {
    if (filter == "0:max") this.getProducts()
    else {
      let loading = this.startLoading();
      this.itemProvider.searchRange(this.navParams.get('id'),filter.split(":")[0],filter.split(":")[1])
      .take(1)
      .subscribe((data:{products:any[],paginate:any}) => {
        data.products.map((product) => {
          if ((<string>product.featured_image).startsWith('//')) {
            product['featured_image'] = 'https:' + product.featured_image;
          }
          return product;
        })
        this.products = data.products;
        this.paginate = data.paginate;
        loading.dismiss();
      })
    }
  
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

}
