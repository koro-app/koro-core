import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemNewspaperDetailPage } from './item-newspaper-detail';

@NgModule({
  declarations: [
    ItemNewspaperDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemNewspaperDetailPage),
  ],
})
export class ItemNewspaperDetailPageModule {}
