import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  collections = {
  	"collections": [
  		{ "title": "Khuyến mãi", "handle": "khuyen-mai", "id": "1000778330", "image": "http://file.hstatic.net/1000180292/collection/hcol-image-1.jpg" },
  		{ "title": "Áo khoác da", "handle": "ao-khoac-da", "id": "1000774014", "image": "http://file.hstatic.net/1000180292/collection/be48ff07e34903c19ab4dd199be9b9f8_61ba72a79ef844b2bffbd0018c058bd1.jpg" },
  		{ "title": "Áo khoác Santiago", "handle": "ao-khoac-santiago", "id": "1000774013", "image": "http://file.hstatic.net/1000180292/collection/8b23e54d1415b096d50abb025853ed99_ddf8e8e5678a461c9eb7a1c2e2736e27.jpg" },
  		{ "title": "Áo khoác Jakiro", "handle": "ao-khoac-jakiro", "id": "1000774012", "image": "http://file.hstatic.net/1000180292/collection/5949e7c1e2ec61423d38444cb9da6b7c_7557572ad5a04926bc35260aa6fe82c4.jpg" },
  		{ "title": "Áo Sơmi", "handle": "ao-somi-1", "id": "1000774011", "image": "http://file.hstatic.net/1000180292/collection/d05cbf8d008b067fc3bf59dbe382ed50_e1d461d6e8fd4d3f91d250c9c1d8fa61.jpg" } 
  	]
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openCollection(collection){
  	
  }

  goSearch(){
    this.navCtrl.push('ItemSearchPage');
  }

  viewNoti(){
    this.navCtrl.push('ItemNotificationsPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemListCollectionPage');
  }

}
