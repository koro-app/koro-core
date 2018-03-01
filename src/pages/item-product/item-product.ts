import { Store } from '@ngrx/store';
import { ItemProvider } from './../../providers/item/item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ModalController, PopoverController } from 'ionic-angular';
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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public itemProvider: ItemProvider,
    public modalCtrl: ModalController,
    public store: Store<any>,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController
  ) {
    this.getProduct();
  }


  getProduct() {
    this.itemProvider
    .getProduct(this.navParams.get('handle'))
    .take(1)
    .subscribe((data:any) => {
      this.normalize(data);
      this.store.dispatch(new seenProductActions.AddSeenAction(data.product))
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
      return {...option,details,selectedDetail:details[0]}
    })
  }

  uniqueArray(arrArg:any[]) {
    return arrArg.filter((elem, i, arr) => {
      return arr.indexOf(elem) == i;
    });
  };

  ionViewDidLoad() {

  }

  presentModal() {
    let modal = this.modalCtrl.create('ItemProductDescriptionPage',{description:this.productDetail.body_html});
    modal.present();
  }

  addToCart(product) {
    this.store.select('cart','entities')
    .take(1)
    .subscribe((variants) => {
      let variant = this.getVariantByTitle(product,product.selectedVariant);
      if (variants[variant.id] == undefined || variants[variant.id].selectedVariant != variant.selectedVariant) {
        this.store.dispatch(new cartActions.AddAction(variant));
        this.presentToast(`Đã thêm ${product.title} loại ${variant.title}`);
      } else {
        this.store.dispatch(new cartActions.IncreaseAction(variant));
        this.presentToast(`Tăng 1 sản phẩm ${product.title} bản ${variant.title}`);
      }
    })
    
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
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
  viewProduct(detail){

  }

  goSearch(){
    this.navCtrl.push('ItemSearchPage');
  }

  // hide tabbar on page product
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
