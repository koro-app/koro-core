import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemCheckoutPage } from './item-checkout';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

@NgModule({
  declarations: [
    ItemCheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCheckoutPage),
  ],
  entryComponents: [
    ItemCheckoutPage
  ],
  providers: [
  	ThemeableBrowser
  ]
})
export class ItemCheckoutPageModule {}
