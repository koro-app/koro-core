import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemProductDescriptionPage } from './item-product-description';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ItemProductDescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemProductDescriptionPage),
    ComponentsModule
  ],
  entryComponents: [
    ItemProductDescriptionPage
  ]
})
export class ItemProductDescriptionPageModule {}
