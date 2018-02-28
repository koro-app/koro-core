import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemNotificationsPage } from './item-notifications';

@NgModule({
  declarations: [
    ItemNotificationsPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemNotificationsPage),
  ],
})
export class ItemNotificationsPageModule {}
