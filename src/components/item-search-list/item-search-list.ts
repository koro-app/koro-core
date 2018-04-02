import { Component, Output, EventEmitter, Input } from '@angular/core';

/**
 * Generated class for the ItemSearchListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'item-search-list',
  templateUrl: 'item-search-list.html'
})
export class ItemSearchListComponent {

  @Input() showResult: boolean;
  @Input() myInput = "";
  @Input() products:any[];
  @Output() goDetail: EventEmitter<any> = new EventEmitter();

  constructor() {
    // console.log('Hello ItemSearchListComponent Component');
  }

}
