import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemNewspaperPage } from './item-newspaper';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemNewspaperPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemNewspaperPage),
    DirectivesModule
  ],
})
export class ItemNewspaperPageModule {}
