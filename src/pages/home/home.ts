import { Store } from '@ngrx/store';
import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NavController, IonicPage, Platform, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import * as cartActions from '../../store/product-cart/product-cart.actions'
import * as seenProductActions from '../../store/seen-product/seen-product.actions'
import 'rxjs/add/operator/do'
import { ItemProvider } from '../../providers/item/item';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
  showToolbar:boolean = false;
  tabBarElement: any;
  headerHiddenPadding: any;
  menuSideHiddenPadding: any;
  banner;
  myInput:any;
  constructor(
    public navCtrl: NavController,
    public statusBar: StatusBar,
    public viewCtrl: ViewController,
    public store: Store<any>,
    public itemProvider: ItemProvider,
    public platform:Platform,
    public ref: ChangeDetectorRef
  ) {
    this.getProducts();
    this.getBanner();
    this.getSeenProducts();
  }

  ngAfterViewInit() {
    this.tabBarElement  = document.querySelector('.tabbar.show-tabbar');
    this.headerHiddenPadding = document.querySelector('.ion-page ion-header');
    this.menuSideHiddenPadding = document.querySelector('.menu-inner ion-header, .menu-inner ion-content, .menu-inner ion-footer');
    // console.log('this.headerHiddenPadding',this.headerHiddenPadding);
  }

  onScroll($event: any){
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
    // if(scrollTop >= 120){
      this.changStatusBarOnScroll(scrollTop);
    // }
    
  }

  changStatusBarOnScroll(scrollTop){
    if (this.platform.is('cordova')){
      this.platform.ready().then(() => {
        if(scrollTop >= 120){
          // this.statusBar.overlaysWebView(true);
          this.statusBar.backgroundColorByHexString("#000000");
        }else{
          // this.statusBar.backgroundColorByHexString("#33000000");
          // if (this.platform.is('ios') || this.platform.is('windows')) {
          //   this.statusBar.styleBlackTranslucent();
          //   this.statusBar.overlaysWebView(false);
          // }else{
          //   // this.statusBar.backgroundColorByHexString("#33000000");
          // }
          this.statusBar.overlaysWebView(true);
        }
        console.log('statusbar home');
      });
    }
  }
 
  getSeenProducts() {
    this.store.dispatch(new seenProductActions.GetAllSeenAction())
  }

  getProducts() {
    this.store.dispatch(new cartActions.GetProductsAction())
  }

  checkout() {
    this.navCtrl.push('ItemCartPage', {}, {animate: true, direction: 'forward'});
  }

  onCancel() {
  }

  onInput(ev, keycode) {
    let val = ev.target.value;
    if (keycode == 13) {
      this.navCtrl.push('ItemSearchPage',{value:val});
    }
  }
  shouldShowCancel() {

  }

  search() {
    this.navCtrl.push('ItemSearchPage');
  }

  // get banner
  getBanner(){
    this.itemProvider.checkConfig()
    .then((result:any) => {
      if (result == false) {
        this.itemProvider.getConfig().subscribe((data:any) => {
          this.banner = data.home.banner[0].src;
          this.itemProvider.saveStoreConfig(data);
        })
      }else{
        this.banner = result.home.banner[0].src;
      }
    })
  }

  scanBarCode(){
    this.navCtrl.push('ItemBarcodePage');
  }

  viewNoti(){
    this.navCtrl.push('ItemNotificationsPage');
  }

  ionViewWillEnter(){
    // console.log('will enter');
    // if (this.platform.is('android')){
    //   if(this.platform.version().num < 5){
    //     if ( this.headerHiddenPadding != null) {
    //       console.log('version android 1',this.platform.version().num);
    //       // this.headerHiddenPadding.style.cssText = 'padding-top: 0!important';
    //     }
    //   }else{
    //     if ( this.menuSideHiddenPadding != null) {
    //       this.menuSideHiddenPadding.style.cssText = 'top: 20px!important';
    //     }
    //   }
    // }
    this.showToolbar = this.showToolbar;
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')){
        if(this.showToolbar){
          this.statusBar.backgroundColorByHexString("#000000");
        }else{
          this.statusBar.overlaysWebView(true);
        }
        console.log('statusbar home enter');
      }
    });
    if (this.tabBarElement != null) {
      this.tabBarElement.style.cssText = 'display:flex !important';
    }
  }

  ionViewWillLeave(){
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')){
        this.statusBar.overlaysWebView(true);
        this.statusBar.backgroundColorByHexString("#000000");
        console.log('home leave statusbar');
      }
    })
  }

}
