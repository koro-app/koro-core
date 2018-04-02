import { Store } from '@ngrx/store';
import { ItemCollectionPage } from './../item-collection/item-collection';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-item-search',
  templateUrl: 'item-search.html',
})
export class ItemSearchPage extends ItemCollectionPage {
  myInput:any;
  tabBarElement: any = document.querySelector('.tabbar.show-tabbar');
  valueInput;
  emptyImgSearch;
  showResultSearch: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
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
      platform,
      store,
      loadingCtrl,
      toastCtrl
    );
    this.myInput = this.navParams.get('value');
    if (this.myInput != null && this.myInput != undefined && this.myInput != '' && this.myInput != 'undefined') {
      console.log('myInput:', this.myInput);
      this.getResults();
      this.getEmptyImg();
    }
  }

  getEmptyImg(){
    this.itemProvider.checkConfig()
    .then((result:any) => {
      if (result == false) {
        this.itemProvider.getConfig().subscribe((data:any) => {
          this.emptyImgSearch = data.emptysearch;
          this.itemProvider.saveStoreConfig(data);
        })
      }else{
        this.emptyImgSearch = result.emptysearch;
      }
    })
  }

  onCancel() {
  }

  setPageName() {
    // we dont do this, so let it empty
  }

  getProducts() {
    // we dont do this, so let it empty
  }

  getResults() {
    let loading = this.startLoading();
    this.itemProvider.searchString(this.myInput)
    .take(1)
    .debounceTime(500)
    .subscribe((data:{products:any[],paginate:any}) => {
      data.products.map((product) => {
        if ((<string>product.featured_image).startsWith('//')) {
          product['featured_image'] = 'https:' + product.featured_image;
        }
        return product;
      })
      this.showResultSearch = true;
      this.products = data.products;
      this.paginate = data.paginate;
      loading.dismiss();
    })
  }

  onInput(ev, keycode) {
    this.showResultSearch = false;
    if (keycode == 13) {
      this.myInput = ev.target.value;
      this.getResults();
    }
  }

  shouldShowCancel() {

  }

  back() {
    this.viewCtrl.dismiss();
  }
  // hide tabbar on page search
  ionViewWillEnter() {
    if (this.tabBarElement != null) {
      this.tabBarElement.style.display = 'flex';
    }
  }

  ionViewDidLoad() {
  }
  
}
