import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemProductDescriptionPage, SafePipe } from './item-product-description';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemProductDescriptionPage,
    SafePipe
  ],
  imports: [
    IonicPageModule.forChild(ItemProductDescriptionPage),
    DirectivesModule
  ],
  entryComponents: [
    ItemProductDescriptionPage
  ]
})
export class ItemProductDescriptionPageModule {}
