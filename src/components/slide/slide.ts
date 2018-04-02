import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ItemProvider } from '../../providers/item/item';

/**
 * Generated class for the SlideComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'slide',
  templateUrl: 'slide.html'
})
export class SlideComponent {

  slides: any[];

  constructor(
    public navCtrl: NavController,
    public itemProvider: ItemProvider,
  ) {
    // get slides
    this.itemProvider.checkConfig()
    .then((result:any) => {
      if (result == false) {
        this.itemProvider.getConfig().subscribe((data:any) => {
          this.slides = data.home.slider;
        })
      }else{
        this.slides = result.home.slider;
      }
    })
    // this.slides = [
    //   'https://theme.hstatic.net/1000259614/1000332464/14/slideshow_1.png?v=162',
    //   'https://theme.hstatic.net/1000259614/1000332464/14/slideshow_2.png?v=162'
    // ]
  }

  goAll() {
    this.navCtrl.push('ItemCollectionPage',{handle:'all',name:'Tất cả sản phẩm'})
  }

}
