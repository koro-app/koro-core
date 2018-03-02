import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// storage
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ItemCartNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-cart-note',
  templateUrl: 'item-cart-note.html',
})
export class ItemCartNotePage {
  contentNote = "";
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public storage: Storage
  	) {
  	this.storage.get('noteToCart').then((note) => {
      this.contentNote = note;
    });
  }

  // luu ghi chu
  saveNote(){
  }
  dismiss(){
    this.storage.set('noteToCart', this.contentNote).then((data) => {
      this.navCtrl.pop();
    })
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ItemCartNotePage');
  }

}
