import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemOrderDetailPage } from './item-order-detail';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemOrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemOrderDetailPage),
    DirectivesModule
  ],
})
export class ItemOrderDetailPageModule {}
