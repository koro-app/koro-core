import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the ItemProductDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-product-description',
  templateUrl: 'item-product-description.html',
})
export class ItemProductDescriptionPage {
  description: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController) {
      this.description = this.navParams.get('description')
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ItemProductDescriptionPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
