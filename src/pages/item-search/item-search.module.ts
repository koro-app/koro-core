import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemSearchPage } from './item-search';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemSearchPage),
    ComponentsModule,
    DirectivesModule
  ],
})
export class ItemSearchPageModule {}
