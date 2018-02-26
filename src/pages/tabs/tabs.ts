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
  tab2Root = 'ItemCollectionPage';
  tab3Root = 'ItemCartPage';
  tab4Root = 'MePage';
  selectedIndex: number = 0;
  // tab3Root = 'SidePage';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public cd: ChangeDetectorRef,
    public userProvider: UserProvider
  ) {
    this.selectedIndex = navParams.data.tabIndex || 0;
    this.events.subscribe('selectTabs',select => {
        this.tabRef.select(select);
        console.log('someone select to tab',select)
        cd.detectChanges();
    })
  }

  tabChange(event) {
    // if (event.id == "t0-3") {
    //   this.userProvider.checkUser().then(user =>{
    //     if (user) this.userProvider.inAppAccount()
    //     else this.userProvider.inAppLogin();
    //   })
    // }
  }

 
}
