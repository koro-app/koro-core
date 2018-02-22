import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemProductDescriptionPage } from './item-product-description';

@NgModule({
  declarations: [
    ItemProductDescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemProductDescriptionPage),
  ],
  entryComponents: [
    ItemProductDescriptionPage
  ]
})
export class ItemProductDescriptionPageModule {}
