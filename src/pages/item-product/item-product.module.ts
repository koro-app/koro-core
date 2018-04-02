import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemProductPage } from './item-product';
import { ComponentsModule } from '../../components/components.module';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ItemProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemProductPage),
    ComponentsModule,
    DirectivesModule
  ],
  entryComponents: [
    ItemProductPage
  ],
  providers: [
    SocialSharing
  ]
})
export class ItemProductPageModule {}
