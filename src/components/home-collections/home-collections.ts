import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ItemProvider } from '../../providers/item/item';

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
  collections: any[];

  constructor(
    public navCtrl: NavController,
    public itemProvider: ItemProvider
  ) {
    this.getHomeCollections();
  }

  // get home collections
  getHomeCollections(){
    this.itemProvider.getConfig()
    .subscribe((data:any) => {
      this.collections = data.home.listcollections;
    });
  }
 
  goCollection(collection) {
    this.navCtrl.push('ItemCollectionPage',collection)
  }
  goProduct(handle){
    console.log('handle',handle);
    this.navCtrl.push('ItemProductPage',{handle: handle});
  }

}
