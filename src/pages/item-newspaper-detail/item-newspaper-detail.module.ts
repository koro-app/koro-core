import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemNewspaperDetailPage } from './item-newspaper-detail';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemNewspaperDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemNewspaperDetailPage),
    DirectivesModule
  ],
})
export class ItemNewspaperDetailPageModule {}
