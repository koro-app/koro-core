import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemCartNotePage } from './item-cart-note';

@NgModule({
  declarations: [
    ItemCartNotePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemCartNotePage),
  ],
})
export class ItemCartNotePageModule {}
