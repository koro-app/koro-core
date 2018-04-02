import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemAccountPage } from './item-account';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemAccountPage),
    DirectivesModule
  ],
})
export class ItemAccountPageModule {}
