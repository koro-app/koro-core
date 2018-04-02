import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemSeenProductPage } from './item-seen-product';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemSeenProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemSeenProductPage),
    DirectivesModule
  ],
})
export class ItemSeenProductPageModule {}
