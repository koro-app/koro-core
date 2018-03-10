import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemCheckoutPage } from './item-checkout';

@NgModule({
  declarations: [
    ItemCheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCheckoutPage),
  ],
  entryComponents: [
    ItemCheckoutPage
  ]
})
export class ItemCheckoutPageModule {}
