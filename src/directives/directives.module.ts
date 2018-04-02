// import { DirectivesModule } from './directives.module';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { NoPaddingHeaderDirective } from './no-padding-header/no-padding-header';
@NgModule({
	declarations: [NoPaddingHeaderDirective],
	imports: [
		CommonModule,
		IonicModule,
	],
	exports: [NoPaddingHeaderDirective]
})
export class DirectivesModule {}
