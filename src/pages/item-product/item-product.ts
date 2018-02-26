import { Store } from '@ngrx/store';
import { ItemProductDescriptionPage } from './../item-product-description/item-product-description';
import { ItemProvider } from './../../providers/item/item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ModalController, PopoverController } from 'ionic-angular';
import * as cartActions from '../../store/product-cart/product-cart.actions';
import 'rxjs/add/operator/take'

@IonicPage()
@Component({
  selector: 'page-item-product',
  templateUrl: 'item-product.html',
})
export class ItemProductPage {
  product: any;
  options:{
    position: number,
    name: string,
    details: string[],
    selectedDetail: string
  }[];
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
    })
  }

  normalize(data) {
    this.product = data;
    // create sale percent
    this.product['sale'] = Math.round(100 - data.price/data.compare_at_price*100)
    // recaculate price
    this.product['price'] = Math.round(this.product.price/100);
    // // for VND style price
    // this.product['showPrice'] = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(this.product.price);
    // for wrong image
    if ((<string>this.product.featured_image).startsWith('//')) {
      this.product['featured_image'] = 'https:' + this.product.featured_image;
    }
    // creating options variant
    this.options = this.generateOptions(this.product.options,this.product.variants);
  }

  generateOptions(options,variants) {
    return options.map(option => {
      let details = variants.map(variant => variant[`option${option.position}`]);
      details = this.uniqueArray(details);
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
    return arrArg.filter((elem, i,arr) => {
      return arr.indexOf(elem) == i;
    });
  };

  ionViewDidLoad() {

  }

  presentModal() {
    let modal = this.modalCtrl.create('ItemProductDescriptionPage',{description:this.product.description});
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
      variant: this.product
    }, {cssClass: 'variant-product'});
    popover.present();
  }

  // view product
  viewProduct(detail){

  }

}
