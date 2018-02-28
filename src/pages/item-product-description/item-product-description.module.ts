import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemProductDescriptionPage, SafePipe } from './item-product-description';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ItemProductDescriptionPage,
    SafePipe
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
