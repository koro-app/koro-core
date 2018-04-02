import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemCartPage } from './item-cart';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemCartPage
  ],
  imports: [
    IonicPageModule.forChild(ItemCartPage),
    DirectivesModule
  ],
})
export class ItemCartPageModule {}
