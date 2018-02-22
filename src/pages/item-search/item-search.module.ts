import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemSearchPage } from './item-search';

@NgModule({
  declarations: [
    ItemSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemSearchPage),
    ComponentsModule
  ],
})
export class ItemSearchPageModule {}
