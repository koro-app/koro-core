import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemOrderDetailPage } from './item-order-detail';

@NgModule({
  declarations: [
    ItemOrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemOrderDetailPage),
  ],
})
export class ItemOrderDetailPageModule {}
