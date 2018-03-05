import { Component, Output, EventEmitter } from '@angular/core';

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
  filterList = [
    {
      name:'Bộ lọc',
      range:'auto',
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
      range:'1500000:9999999999999',
      selected: false
    }
  ]
  sortList = [
    {
      name:'Sắp xếp theo',
      range:'auto',
      selected: true
    },
    {
      name:'Mới nhất',
      range:'created-descending',
      selected: false
    },
    {
      name:'Tùy chọn',
      range:'manual',
      selected: false
    },
    {
      name:'Cũ nhất',
      range:'created-ascending',
      selected: false
    },
    {
      name:'Giá từ thấp tới cao',
      range:'price-ascending',
      selected: false
    },
    {
      name:'Giá từ cao tới thấp',
      range:'price-descending',
      selected: false
    },
    {
      name:'Theo bảng chữ cái từ A-Z',
      range:'title-ascending',
      selected: false
    },
    {
      name:'Theo bảng chữ cái từ Z-A',
      range:'title-descending',
      selected: false
    },
    {
      name:'Sản phẩm bán chạy',
      range:'best-selling',
      selected: false
    }
  ]
  sortRange: any;
  filterRange: any;
  @Output() filterEvent: EventEmitter<any> = new EventEmitter();
  sortBy = {
    cssClass: 'sort-and-filter',
  }
  constructor(
  ) {
  }
  turnOffSort(){
    this.sortRange = 'auto';
  }
  turnOffFilter(){
    this.filterRange = 'auto';
    // this.filterRange = '0:max';
  }

}
