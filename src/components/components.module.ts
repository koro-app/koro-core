import { HomeCollectionsComponent } from './home-collections/home-collections';
import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { SlideComponent } from './slide/slide';
import { CommonModule } from '@angular/common';
import { ItemProductVariantsComponent } from './item-product-variants/item-product-variants';
import { ItemCollectionFilterComponent } from './item-collection-filter/item-collection-filter';
import { ItemCollectionListComponent } from './item-collection-list/item-collection-list';
@NgModule({
	declarations: [SlideComponent,
    HomeCollectionsComponent,
    ItemProductVariantsComponent,
    ItemCollectionFilterComponent,
    ItemCollectionListComponent,
    ],
	imports: [
		CommonModule,
		IonicModule,
	],
	exports: [SlideComponent,
    HomeCollectionsComponent,
    ItemProductVariantsComponent,
    ItemCollectionFilterComponent,
    ItemCollectionListComponent,
	],
	entryComponents: [
		ItemProductVariantsComponent
	]
})
export class ComponentsModule {}
