
import { NgModule } from '@angular/core';

import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    imports: [
        IonicPageModule.forChild(HomePage),
        ComponentsModule
    ],
    exports: [],
    declarations: [HomePage],
    providers: [],
    entryComponents: [HomePage]
})
export class HomePageModule { }
