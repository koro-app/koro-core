import { Component, Input, EventEmitter,Output } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

/**
 * Generated class for the ItemProductVariantsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'item-product-variants',
  templateUrl: 'item-product-variants.html'
})
export class ItemProductVariantsComponent implements OnInit {
  @Input() options:{
    position: number,
    name: string,
    details: string[],
    selectedDetail: string
  }[];

  @Output() selectedVariant:EventEmitter<any> = new EventEmitter();
  constructor() {
  }
  
  ngOnInit() {
    this.emitVariant();
  }

  selectedDetail(option,detail) {
    this.options[option.position-1].selectedDetail = detail;
    this.emitVariant();
  }

  emitVariant() {
    let variantString = this.options
    .map(option => option.selectedDetail)
    .join(' / ');
    this.selectedVariant.emit(variantString);
  }

}
