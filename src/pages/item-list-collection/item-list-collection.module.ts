import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemListCollectionPage } from './item-list-collection';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemListCollectionPage
  ],
  imports: [
    IonicPageModule.forChild(ItemListCollectionPage),
  	ComponentsModule,
    DirectivesModule
  ],
  entryComponents: [
    ItemListCollectionPage
  ]
})
export class ItemListCollectionPageModule {}
