import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemPolicyPage } from './item-policy';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemPolicyPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemPolicyPage),
    DirectivesModule
  ],
})
export class ItemPolicyPageModule {}
