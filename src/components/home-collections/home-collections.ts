import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the HomeCategoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'home-collections',
  templateUrl: 'home-collections.html'
})
export class HomeCollectionsComponent {
  collections: any[] = [
    {
      id: 1001093550,
      handle: 'hot-products',
      name: 'Sản phẩm nổi bật',
      imgSrc: 'https://product.hstatic.net/1000259614/product/cheese-pizza_large.png'
    },
    {
      id:1001093549,
      handle: 'onsale',
      name: 'Đang giảm giá',
      imgSrc: 'https://product.hstatic.net/1000259614/product/garden-salad_large.png'
    },
    {
      id: 1001093548,
      handle: 'frontpage',
      name: 'Sản phẩm mới',
      imgSrc: 'https://product.hstatic.net/1000259614/product/garlic-bread-1_large.png'
    }
  ]

  constructor(
    public navCtrl: NavController
  ) {
  }

  goCollection(collection) {
    this.navCtrl.push('ItemCollectionPage',collection)
  }

}
