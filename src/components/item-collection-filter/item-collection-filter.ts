import { Component, Output, EventEmitter } from '@angular/core';
// import { Select } from 'ionic-angular';

/**
 * Generated class for the ItemCollectionFilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'item-collection-filter',
  templateUrl: 'item-collection-filter.html'
})
export class ItemCollectionFilterComponent {
  priceList = [
    {
      name:'Tất cả',
      range:'0:max',
      selected: true
    },
    {
      name:'Nhỏ hơn 100,000₫',
      range:'0:100000',
      selected: false
    },
    {
      name:'Từ 100,000₫ - 300,000₫',
      range:'100000:300000',
      selected: false
    },
    {
      name:'Từ 300,000₫ - 500,000₫',
      range:'300000:500000',
      selected: false
    },
    {
      name:'Từ 500,000₫ - 1,000,000₫',
      range:'500000:1000000',
      selected: false
    },
    {
      name:'Từ 1,000,000₫ - 1,500,000₫',
      range:'1000000:1500000',
      selected: false
    },
    
    {
      name:'Lớn hơn 1,500,000₫',
      range:'1500000:999999999999',
      selected: false
    }
  ]
  priceRange: any;

  @Output() filterEvent: EventEmitter<any> = new EventEmitter();
    settings: any = {
      title: 'Pizza Toppings',
      subTitle: 'Select your toppings',
      mode: 'md'
    };
  constructor(
    // public select: Select
  ) {
    
  }

  // 
  // selectFilter(){
  //   this.select.options = this.settings
  //   this.select.open();
  // }

}
