import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MePage } from './me';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    MePage,
  ],
  imports: [
    IonicPageModule.forChild(MePage),
    DirectivesModule
  ]
})
export class MePageModule {}
