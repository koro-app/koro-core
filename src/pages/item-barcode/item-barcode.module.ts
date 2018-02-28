import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemBarcodePage } from './item-barcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [
    ItemBarcodePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemBarcodePage),
  ],
  providers: [
  	BarcodeScanner
  ]
})
export class ItemBarcodePageModule {}
