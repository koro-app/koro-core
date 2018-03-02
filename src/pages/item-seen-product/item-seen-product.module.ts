import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemSeenProductPage } from './item-seen-product';

@NgModule({
  declarations: [
    ItemSeenProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemSeenProductPage),
  ],
})
export class ItemSeenProductPageModule {}
