import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { UserProvider } from './../../providers/user/user';
import { Tabs, NavController, IonicPage, NavParams, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root = 'HomePage';
  tab2Root = 'ItemListCollectionPage';
  tab3Root = 'ItemNewspaperPage';
  tab4Root = 'ItemCartPage';
  tab5Root = 'MePage';
  selectedIndex: number = 0;
  // tab3Root = 'SidePage';
  productNumber: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public statusBar: StatusBar,
    public events: Events,
    public cd: ChangeDetectorRef,
    public userProvider: UserProvider,
    public store: Store<any>,
  ) {
    this.selectedIndex = navParams.data.tabIndex || 0;
    this.events.subscribe('selectTabs',select => {
      this.tabRef.select(select);
      console.log('someone select to tab',select)
      cd.detectChanges();
    });
    this.getProductNumber();
  }

  tabChange(event) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')){
        if(event.id == "t0-0" || event.id == "t0-4"){
          this.statusBar.overlaysWebView(true);
          // this.statusBar.backgroundColorByHexString("#000000");
          // if (this.platform.is('ios')) {
          //   this.statusBar.styleBlackTranslucent();
          //   this.statusBar.overlaysWebView(false);
          // }else{
          // }
          // console.log('tabs statusbar overlay transparent');
        }else{
          this.statusBar.overlaysWebView(true);
          this.statusBar.backgroundColorByHexString("#000000");
          console.log('tabs statusbar black');
        }
      }
    })
  }

  getProductNumber() {
    // this.productNumber = this.store.select('cart','ids')
    // .map(ids => ids.length)
    this.productNumber = this.store.select('cart','ids')
    .map(ids => ids.length)
    // .do(data => console.log('data',data))
  }

  ionViewWillEnter(){
  }

}
