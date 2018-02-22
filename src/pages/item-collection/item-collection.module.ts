import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemCollectionPage } from './item-collection';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ItemCollectionPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCollectionPage),
    ComponentsModule
  ],
  entryComponents: [
    ItemCollectionPage
  ]
})
export class ItemCollectionPageModule {}
