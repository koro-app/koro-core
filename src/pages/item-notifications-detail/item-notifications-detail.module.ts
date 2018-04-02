import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemNotificationsDetailPage } from './item-notifications-detail';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemNotificationsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemNotificationsDetailPage),
    DirectivesModule
  ],
})
export class ItemNotificationsDetailPageModule {}
