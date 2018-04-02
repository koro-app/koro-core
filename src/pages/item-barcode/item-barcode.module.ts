import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemBarcodePage } from './item-barcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemBarcodePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemBarcodePage),
    DirectivesModule
  ],
  providers: [
  	BarcodeScanner
  ]
})
export class ItemBarcodePageModule {}
