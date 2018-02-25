import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ItemVariantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-variant',
  templateUrl: 'item-variant.html',
})
export class ItemVariantPage {
  variant;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.variant = this.navParams.get('variant');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemVariantPage');
  }

}
