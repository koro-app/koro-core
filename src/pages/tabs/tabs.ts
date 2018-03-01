import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { UserProvider } from './../../providers/user/user';
import { Tabs, NavController, IonicPage, NavParams } from 'ionic-angular';
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
    // if (event.id == "t0-3") {
    //   this.userProvider.checkUser().then(user =>{
    //     if (user) this.userProvider.inAppAccount()
    //     else this.userProvider.inAppLogin();
    //   })
    // }
  }

  getProductNumber() {
    // this.productNumber = this.store.select('cart','ids')
    // .map(ids => ids.length)
    this.productNumber = this.store.select('cart','ids')
    .map(ids => ids.length)
    // .do(data => console.log('data',data))
  }

}
