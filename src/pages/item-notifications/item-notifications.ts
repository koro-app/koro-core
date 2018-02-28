import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';

/**
 * Generated class for the ItemNotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-notifications',
  templateUrl: 'item-notifications.html',
})
export class ItemNotificationsPage {
  blogs;
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public itemProvider: ItemProvider
  	) {
  	this.getBlog();
  }

  getBlog(){
  	this.itemProvider.getBlog().subscribe((data:any) => {
      this.blogs = data.articles;
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ItemNotificationsPage');
  }

}
