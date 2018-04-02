import { ItemProvider } from './../../providers/item/item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/take';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Store } from '@ngrx/store';
import * as cartActions from '../../store/product-cart/product-cart.actions'
import { ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-item-collection',
  templateUrl: 'item-collection.html',
})
export class ItemCollectionPage {
  loading;
  pageName: string = "";
  phone = "0934 323 882";
  tabBarElement: any = document.querySelector('.tabbar.show-tabbar');
  collections: any;
  paginate: any;
  products:any[] = [];
  showResult: boolean = false;
  emptyImg;
  sortByString = "created-descending";
  paddingContent = true;

  constructor(
    public navCtrl: NavController, 
    public itemProvider: ItemProvider,
    public navParams: NavParams,
    public platform: Platform,
    public store: Store<any>,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    this.getPhoneAndSortByAndEmptyImg();
    this.checkPatform();
    this.setPageName();
  }

  checkPatform(){
    if (this.platform.is('android')){
      if(this.platform.version().num < 5){
        this.paddingContent = false;
      }
    }
  }

  setPageName() {
    this.pageName = this.navParams.get('title');
  }

  getPhoneAndSortByAndEmptyImg(){
    this.itemProvider.checkConfig()
    .then((result:any) => {
      if (result != false) {
        if (result.phone != ""){
          this.phone = result.phone;
        }
        this.emptyImg = result.collectionpage.empty;
        this.sortByString = result.collectionpage.sortby;
        this.getProducts();
      }
    })
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
    this.loading = this.startLoading()
    this.collections = this.itemProvider
    .getProducts(this.navParams.get('handle'),this.sortByString)
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
      this.showResult = true;
      this.loading.dismiss();
    })
  }

  goSearch(){
    this.navCtrl.push('ItemSearchPage');
  }

  ionViewDidLoad() {
  }

  goDetail(handle) {
    this.navCtrl.push('ItemProductPage',{handle})
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
    if (filter != 'auto') {
      if (filter.indexOf(':') != -1) {
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
      }else{
        let loading = this.startLoading();
        this.itemProvider.getProductsSortBy(this.navParams.get('handle'),filter)
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
  }

  viewNoti(){
    this.navCtrl.push('ItemNotificationsPage');
  }

  // show tabbar on page cart
  ionViewWillEnter() {
    if (this.tabBarElement != null) {
      this.tabBarElement.style.display = 'flex';
    }
  }
}
