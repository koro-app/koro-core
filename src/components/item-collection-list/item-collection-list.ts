import { Component, Output, EventEmitter, Input } from '@angular/core';

/**
 * Generated class for the ItemCollectionListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'item-collection-list',
  templateUrl: 'item-collection-list.html'
})
export class ItemCollectionListComponent {
  @Input() products:any[];
  @Output() goDetail: EventEmitter<any> = new EventEmitter();
  @Output() addToCart: EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log('Hello ItemCollectionListComponent Component');
    // select.open()
  }

}
