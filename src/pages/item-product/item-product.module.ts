import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemProductPage } from './item-product';
import { ComponentsModule } from '../../components/components.module';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    ItemProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemProductPage),
    ComponentsModule
  ],
  entryComponents: [
    ItemProductPage
  ],
  providers: [
    SocialSharing
  ]
})
export class ItemProductPageModule {}
