import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemCollectionPage } from './item-collection';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemCollectionPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCollectionPage),
    ComponentsModule,
    DirectivesModule
  ],
  entryComponents: [
    ItemCollectionPage
  ]
})
export class ItemCollectionPageModule {}
