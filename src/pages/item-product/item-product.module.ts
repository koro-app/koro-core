import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemProductPage } from './item-product';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ItemProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemProductPage),
    ComponentsModule
  ],
  entryComponents: [
    ItemProductPage
  ]
})
export class ItemProductPageModule {}
