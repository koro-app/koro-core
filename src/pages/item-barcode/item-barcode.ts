import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ItemProvider } from '../../providers/item/item';
// import { Storage } from '@ionic/storage';

/**
 * Generated class for the ItemBarcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-barcode',
  templateUrl: 'item-barcode.html',
})
export class ItemBarcodePage {

  scannedCode = null;
  results: any[];
  
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public itemProvider: ItemProvider,
  	private barcodeScanner: BarcodeScanner
  	) {
      this.scanCode();
  }
 
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.itemProvider.searchByCode(this.scannedCode).subscribe((data:any) => {
        this.results = data.products;
	  });
    }, (err) => {
        console.log('Error: ', err);
    });
  }

  viewProduct(handle) {
    this.navCtrl.push('ItemProductPage', {handle});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemBarcodePage');
  }

}
