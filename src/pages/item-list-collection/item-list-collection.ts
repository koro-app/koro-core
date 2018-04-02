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
  phone = "0934 323 882";
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
    this.itemProviders.checkConfig()
    .then((result:any) => {
      if (result == false) {
        this.itemProviders.getConfig().subscribe((data:any) => {
          this.collections = data.collections;
          if (data.phone != ""){
            this.phone = data.phone;
          }
          loading.dismiss();
          this.itemProviders.saveStoreConfig(data);
        })
      }else{
        this.collections = result.collections;
        if (result.phone != ""){
          this.phone = result.phone;
        }
        loading.dismiss();
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
