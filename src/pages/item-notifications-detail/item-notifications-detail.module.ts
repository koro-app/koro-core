import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemNotificationsDetailPage } from './item-notifications-detail';

@NgModule({
  declarations: [
    ItemNotificationsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemNotificationsDetailPage),
  ],
})
export class ItemNotificationsDetailPageModule {}
