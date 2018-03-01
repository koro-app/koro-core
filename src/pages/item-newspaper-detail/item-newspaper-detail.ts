import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';

/**
 * Generated class for the ItemNewspaperDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-newspaper-detail',
  templateUrl: 'item-newspaper-detail.html',
})
export class ItemNewspaperDetailPage {
  detailNoti;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public itemProvider: ItemProvider
  	) {
  	this.getArticle();
  }

  getArticle(){
  	this.itemProvider.getArticle(this.navParams.get('url')).subscribe((data:any) => {
      this.detailNoti = data.article;
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ItemNewspaperDetailPage');
  }

}
