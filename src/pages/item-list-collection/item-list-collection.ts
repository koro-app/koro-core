import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';

/**
 * Generated class for the ItemListCollectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-list-collection',
  templateUrl: 'item-list-collection.html',
})
export class ItemListCollectionPage {
  collections: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public itemProviders: ItemProvider
    ) {
    this.getListCollection();
  }

  getListCollection(){
    let loading = this.startLoading();
    this.itemProviders.getListCollection().subscribe(data => {
      this.collections = data['listcollections'];
      loading.dismiss();
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

  goCollection(collection) {
    this.navCtrl.push('ItemCollectionPage',collection)
  }

  goSearch(){
    this.navCtrl.push('ItemSearchPage');
  }

  viewNoti(){
    this.navCtrl.push('ItemNotificationsPage');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ItemListCollectionPage');
  }

}
