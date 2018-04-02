import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemOrdersPage } from './item-orders';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemOrdersPage),
    DirectivesModule
  ],
})
export class ItemOrdersPageModule {}
