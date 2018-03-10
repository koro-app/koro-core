import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemOrdersPage } from './item-orders';

@NgModule({
  declarations: [
    ItemOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemOrdersPage),
  ],
})
export class ItemOrdersPageModule {}
