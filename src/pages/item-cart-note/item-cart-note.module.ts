import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemCartNotePage } from './item-cart-note';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemCartNotePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCartNotePage),
    DirectivesModule
  ],
})
export class ItemCartNotePageModule {}
