
import { NgModule } from '@angular/core';

import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
    imports: [
        IonicPageModule.forChild(HomePage),
        ComponentsModule,
        DirectivesModule
    ],
    exports: [],
    declarations: [HomePage],
    providers: [],
    entryComponents: [HomePage]
})
export class HomePageModule { }
