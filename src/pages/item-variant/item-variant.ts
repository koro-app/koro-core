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
  options;
  variants;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.variants = this.navParams.get('variants');
  	this.options = this.navParams.get('options');
  	console.log('options', this.options);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ItemVariantPage');
  }

}
