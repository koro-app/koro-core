import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemNotificationsPage } from './item-notifications';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemNotificationsPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemNotificationsPage),
    DirectivesModule
  ],
})
export class ItemNotificationsPageModule {}
