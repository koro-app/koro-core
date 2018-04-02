import { UserProvider } from './../providers/user/user';
import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ItemProvider } from '../providers/item/item';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;
  pages: Array<{title: string,name:string, index: number}>;
  tabBarElement: any = document.querySelector('.tabbar.show-tabbar');
  colorPrimary = "#000000";

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public app:App,
    public userProvider: UserProvider,
    public itemProvider: ItemProvider
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Trang chủ',name:'HomePage', index:0 },
      { title: 'Nhóm sản phẩm', name: 'ItemListCollectionPage', index:1 },
      { title: 'Giỏ hàng',name: 'ItemCartPage', index:3 },
      { title: 'Tài khoản',name: 'MePage', index:4 },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')){
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.overlaysWebView(true);
        // this.statusBar.overlaysWebView(true);
        this.statusBar.backgroundColorByHexString("#000000");
        // this.statusBar.backgroundColorByHexString("#33000000");
        // this.statusBar.styleBlackTranslucent();
        if (this.platform.is('ios')) {
          // this.statusBar.styleBlackTranslucent();
          // this.statusBar.overlaysWebView(false);
          // this.statusBar.backgroundColorByName('transparent');
        }else{
          // this.statusBar.backgroundColorByHexString("#33000000");
        }
        this.splashScreen.hide();
      }
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);

    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = {
        tabIndex: page.index
        // view: true 
      };
      // console.log('this page',page)
    }
    if ( this.tabBarElement != null) {
      this.tabBarElement.style.cssText = 'display:flex !important';
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
     
       this.nav.getActiveChildNavs()[0].select(page.index);
      //  console.log('page.index',page.index,page);
    } else {
      console.log('set root with page.namae',page.name)
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }
  }

 
}
