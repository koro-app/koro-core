import { Store } from '@ngrx/store';
import { ItemProvider } from './../../providers/item/item';
import { Component, ViewChild } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { ModalController, PopoverController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as cartActions from '../../store/product-cart/product-cart.actions';
import * as seenProductActions from '../../store/seen-product/seen-product.actions';
import 'rxjs/add/operator/take';
@IonicPage()
@Component({
  selector: 'page-item-product',
  templateUrl: 'item-product.html',
})
export class ItemProductPage {
  product: any;
  productDetail: any;
  options:{
    position: number,
    name: string,
    details: string[],
    selectedDetail: string
  }[];
  tabBarElement: any = document.querySelector('.tabbar.show-tabbar');
  seenProducts;
  phone = "0934 323 882";
  paddingContent = true;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform:Platform,
    public statusBar: StatusBar,
    public itemProvider: ItemProvider,
    public modalCtrl: ModalController,
    public store: Store<any>,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public socialSharing: SocialSharing
  ) {
    this.checkPatform();
    this.getPhone();
    this.getProduct();
    this.getSeenProduct();
  }

  getPhone(){
    this.itemProvider.checkConfig()
    .then((result:any) => {
      if (result != false) {
        if (result.phone != ""){
          this.phone = result.phone;
        }
      }
    })
  }

  checkPatform(){
    if (this.platform.is('android')){
      if(this.platform.version().num < 5){
        this.paddingContent = false;
      }
    }
  }

  startLoading() {
    // start loading
    let loading = this.loadingCtrl.create({
      content: 'Đang tải dữ liệu...'
    });
    loading.present();
    return loading;
  }

  getProduct() {
    let loadding = this.startLoading();
    this.itemProvider
    .getProduct(this.navParams.get('handle'))
    .take(1)
    .subscribe((data:any) => {
      this.normalize(data);
      this.store.dispatch(new seenProductActions.AddSeenAction(data.product));
      loadding.dismiss();
    })
  }

  getSeenProduct(){
    this.seenProducts = this.store.select('seenProduct', 'entities')
    .map(products => Object.keys(products || {}).map(key => products[key]))
    .do((products) => {
    })
  }

  normalize(data) {
    this.product = data;
    this.productDetail = data.product;
    // create sale percent
    // this.product['sale'] = Math.round(100 - data.price/data.compare_at_price*100)
    // recaculate price
    // this.product['price'] = Math.round(this.product.price/100);
    // // for VND style price
    // this.product['showPrice'] = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(this.product.price);
    // for wrong image
    // if ((<string>this.productDetail.featured_image).startsWith('//')) {
    //   this.productDetail['featured_image'] = 'https:' + this.productDetail.featured_image;
    // }
    for (let j = 0; j <= this.productDetail.variants.length-1; j++) {
      if (this.productDetail.variants[j].image == '' || this.productDetail.variants[j].image == null) {
        this.productDetail.variants[j].image = this.productDetail.images[0];
      }
    }

    // creating options variant
    this.options = this.generateOptions(this.productDetail.options,this.productDetail.variants);
    this.options = this.options.map(option => {
      (<any>option.details) = option.details.map(detail => {
        return {
          name: detail,
          disabled: false,
          checked: false
        }
      })
      /* 
        return value is: 
        {
          name: 'Đường kính',
          position: '1',
          details: [{
            name: 40cm,
            disabled: false
          }],
          selectedDetail: '40cm'
        }
      */
      return option;
    })
  }

  generateOptions(options,variants) {
    return options.map(option => {
      let details = variants.map(variant => 
        variant[`option${option.position}`]
      );
      details = this.uniqueArray(details)
      /* 
        return value is: 
        {
          name: 'Đường kính',
          position: '1',
          details: ['40cm','30cm','20cm'],
          selectedDetail: '40cm'
        }
      */
      return {...option,details,selectedDetail:""}
    })
  }

  uniqueArray(arrArg:any[]) {
    return arrArg.filter((elem, i, arr) => {
      return arr.indexOf(elem) == i;
    });
  };

  goShare(){
    var urlShare = `https://suplo-fashion.myharavan.com/products/${this.productDetail.handle}`;
    this.socialSharing.share(null, 'Chia sẻ', null, urlShare);
  }

  presentModal() {
    let modal = this.modalCtrl.create('ItemProductDescriptionPage',{description:this.productDetail.body_html});
    modal.present();
  }

  selectedVariant(event) {
    this.product['selectedVariant'] = event;
  }

  getVariantByTitle(product,title) {
    let variant = product.variants.filter(variant => variant.title == title)[0];
    // console.log('variant',variant);
    //setup default featured image
    variant['default_featured_image'] = product.featured_image;
    // setup product title
    variant['productTitle'] = product.title;
    return variant;
  }

  // view variant
  viewVariant(){
    let popover = this.popoverCtrl.create('ItemVariantPage', {
      title: this.productDetail.title,
      variants: this.productDetail.variants,
      options: this.options
    }, {cssClass: 'variant-product'});
    popover.present();
  }

  // view product
  viewProduct(handle){
    this.navCtrl.push('ItemProductPage',{handle});
  }

  goSearch(){
    this.navCtrl.push('ItemSearchPage');
  }

  goCollection(handle, title){
    this.navCtrl.push('ItemCollectionPage',{
      handle: handle,
      title: title
    });
  }

  goSeenProduct(){
    this.navCtrl.push('ItemSeenProductPage');
  }

  goHome(){
    this.navCtrl.setRoot('HomePage');
    if ( this.tabBarElement != null) {
      this.tabBarElement.style.cssText = 'display:flex !important';
    }
  }

  viewNoti(){
    this.navCtrl.push('ItemNotificationsPage');
  }

  // hide tabbar on page product
  ionViewWillEnter() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')){
        this.statusBar.overlaysWebView(true);
        this.statusBar.backgroundColorByHexString("#000000");
        console.log('product statusbar');
      }
    })
    if (this.tabBarElement != null) {
      this.tabBarElement.style.cssText = 'display:none !important';
    }
  }

  // show normail tabbar
  ionViewWillLeave() {
    if (this.tabBarElement != null) {
      this.tabBarElement.style.cssText = 'display:flex !important';
    }
  }

}
