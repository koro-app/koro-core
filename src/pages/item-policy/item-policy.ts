import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';

/**
 * Generated class for the ItemPolicyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-policy',
  templateUrl: 'item-policy.html',
})
export class ItemPolicyPage {
  policy;
  show: boolean = false;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public itemProvider: ItemProvider
  	) {
  	// get policy
  	this.itemProvider.checkConfig()
    .then((result:any) => {
      if (result == false) {
        this.itemProvider.getConfig().subscribe((data:any) => {
          this.itemProvider.getPolicyPage(data.policypage).subscribe((policy:any) => {
            this.policy = policy.page;
            this.show = true;
          })
          this.itemProvider.saveStoreConfig(data);
        })
      }else{
        this.itemProvider.getPolicyPage(result.policypage).subscribe((policy:any) => {
          this.policy = policy.page;
          this.show = true;
      	})
      }
    })
  }

  ionViewDidLoad() {
  }

}
