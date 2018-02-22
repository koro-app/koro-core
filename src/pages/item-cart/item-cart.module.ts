import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemCartPage } from './item-cart';

@NgModule({
  declarations: [
    ItemCartPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCartPage),
  ],
})
export class ItemCartPageModule {}
