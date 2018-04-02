import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemSupportPage } from './item-support';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemSupportPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemSupportPage),
    DirectivesModule
  ],
})
export class ItemSupportPageModule {}
