import { Storage } from '@ionic/storage';
import { UserProvider } from './../../providers/user/user';
import { ItemProvider } from './../../providers/item/item';
import { StatusBar } from '@ionic-native/status-bar';
import { Component, Renderer2, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {
  tab1Root = 'HomePage';
  tab2Root = 'ItemListCollectionPage';
  tab3Root = 'ItemNewspaperPage';
  tab4Root = 'ItemCartPage';
  tab5Root = 'MePage';
  showToolbar:boolean = false;
  showUser:boolean = false;
  fromAccountLink:boolean = false;
  loader:Loading;
  browser;
  isLoader = false;  
  options = {
    statusbar: {
        color: '#000000'
    },
    toolbar: {
        height: 44,
        color: '#000000'
    },
    title: {
        color: '#ffffff',
        staticText: 'Đăng ký/Đăng nhập'
    },
    closeButton:{
      wwwImage: 'assets/icon/back.png',
      align: 'left',
      event: 'closePressed'
    },
    // hidden: "true",
    // clearcache: "true",
    // clearsessioncache: "true",
    backButtonCanClose: true
  };
  // inforAccount;
  inforAccount = {
    "name": "",
    "email": "",
    "phone": "",
    "birthday": "",
    "address": "",
    "province": "",
    "city": "",
    "gender": "",
    "orders": [],
    "addresses": []
  };
  userData;
  constructor(
    public ref: ChangeDetectorRef,
    public navCtrl: NavController, 
    public platform: Platform,
    public statusBar: StatusBar,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public renderer: Renderer2,
    public loadCtrl: LoadingController,
    public storage: Storage
  ) {
    // this.checkUserLogin();
  }

  onScroll($event: any){
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    this.ref.detectChanges();
  }

  checkUserLogin() {
    this.userProvider.checkUser().then((user) => {
      if (user == false) {
        this.showLoad();
        this.showUser = false;
        this.directWhenNotLogin();
        // this.showLoad();
        // this.loader.dismiss();
      } else {
        this.showUser = true;
        this.userData = user;
        // this.loader.dismiss();
      }
    })
  }

  directWhenNotLogin(){
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() =>{
        this.browser = cordova.ThemeableBrowser.open('https://suplo-fashion.myharavan.com/account/login?view=app.style', '_blank', this.options);
        this.actionBrowser();
        // this.loader.dismiss();
      })
    }
  }
  // kiem tra su kien tren browser checkout
  actionBrowser(){
    this.browser.addEventListener('backPressed', function(e) {
    })
    .addEventListener('helloPressed', function(e) {
    })
    .addEventListener('closePressed', (data) => {
      if (data.url.endsWith('login?view=app.style') || data.url.endsWith('login') || data.url.endsWith('register?view=app.style') || data.url.endsWith('register')) {
        // this.navCtrl.setRoot('HomePage');
        // this.tabRef.selectedIndex = 0;
        this.loader.dismiss();
        this.navCtrl.parent.select(0);
        this.browser.close();
      }
    })
    .addEventListener('loadstart', (data) =>  {
      // xu ly login, regis, account
      console.log(data.url);
      // if (data.url == "https://suplo-fashion.myharavan.com/account/" || data.url == "https://suplo-fashion.myharavan.com/account") {
      //   if(this.isLoader == false){
      //     this.browser.close();
      //     this.browser = cordova.ThemeableBrowser.open('https://suplo-fashion.myharavan.com/account?view=app.style', '_self', this.options);
      //     this.actionBrowser();
      //   }
      //   this.isLoader = true;
      //   // window.open('https://suplo-fashion.myharavan.com/account?view=app.style');
      //   // this.userStore();
      //   // this.userProvider.getUserDataTest().subscribe((userinfor) => {
      //   //   console.log('userinfor',userinfor);
      //   // })
      //   // this.browser.close();
      // }
      if (data.url.endsWith('account?view=app.style') || data.url.endsWith('account')) {
        this.browser.executeScript({
          code: "document.cookie"
        }, ((cookieData) => {
          console.log('loadstart cookieData', cookieData);
          document.cookie = cookieData;
          console.log('document.cookie loadstart',document.cookie);
        }));
      }
      // xu ly logout
      setTimeout(() => {
        if (data.url.endsWith('myharavan.com/') || data.url.endsWith('myharavan.com')) {
          this.loader.dismiss();
          console.log(' loadstart here close');
          this.browser.close();
        }
      }, 800);
    })
    .addEventListener('loadstop', (data) =>  {
      // xu ly login, regis, account
      // this.browser.insertCSS({code: this.cssVariable},
      //   () => {
          // this.browser.show(); 
          // if (data.url == "https://suplo-fashion.myharavan.com/account/" || data.url == "https://suplo-fashion.myharavan.com/account") {
          //   this.userStore();
          //   this.browser.close();
          // }
      //   }
      // )
      if (data.url.endsWith('account/') || data.url.endsWith('account') || data.url.endsWith('account?view=app.style')) {
        this.browser.executeScript({
          code: "document.cookie"
        }, ((cookieData) => {
          console.log('loadstop cookieData', cookieData);
          document.cookie = cookieData;
          console.log('document.cookie loadstop',document.cookie);
        }));
        // test all
        this.browser.executeScript({
          code: "document.getElementsByClassName('account_infor_app')[0].innerHTML"
        }, ((allinfor) => {
          this.userData = JSON.parse(allinfor[0]);
          this.userProvider.saveUsername(this.userData);
          console.log('browser loadstop: userData', this.userData);
          this.loader.dismiss();
          this.navCtrl.setRoot(this.navCtrl.getActive().component)
          this.browser.close();
        }));
        // this.userData = this.inforAccount;
        // this.userStore();
      }
      // xu ly logout
      // if (data.url.endsWith('myharavan.com/') || data.url.endsWith('myharavan.com')) {
      //   this.browser.close();
      // }
      // /xu ly logout
      if (data.url.endsWith('logout/') || data.url.endsWith('logout') || data.url.endsWith('myharavan.com/') || data.url.endsWith('myharavan.com')) {
        this.browser.close();
      }
    })
    .addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
        console.error(e.message);
    })
    .addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
        console.log(e.message);
    });
  }

  userStore(){
    console.log('get user and store it');
    try {
      console.log('here 1');
      this.userProvider.getUserData()
      .subscribe((data) => {
        JSON.stringify(data);
        console.log('here 2',JSON.stringify(data));
        try {
          console.log('store use try',data);
          // this.inforAccount = data;
          // this.userProvider.saveUsername(this.inforAccount);
          this.showUser = true;
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        } catch (error) {
          console.log('catch',error);
          throw error;
        }
        // console.log('store use',data,this.inforAccount);
        // this.tabRef.select(4);
        // this.navCtrl.parent.select(4);
      })
    } catch (error) {
      throw error;
    }
    // this.storage.get('account').then((data) => {
      // this.storage.set('account', this.userData);
      // console.log('here', this.showUser);
    // });
  }

  showLoad() {
    this.loader = this.loadCtrl.create({content: 'Vui lòng đợi...'})
    this.loader.present();
    return this.loader;
  }

  logOut() {
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() =>{
        this.browser = cordova.ThemeableBrowser.open('https://suplo-fashion.myharavan.com/account/logout', '_blank', this.options);
        this.actionBrowser();
        this.removeUserStore();
        this.navCtrl.setRoot('HomePage');
      })
    }
    // this.showUser = false;
  }

  viewOrder(order:string){
    this.navCtrl.push('ItemOrdersPage', {order: order});
  }

  viewProfile(){
    this.navCtrl.push('ItemAccountPage');
  }

  viewPolicy(){
    this.navCtrl.push('ItemPolicyPage');
  }

  viewSupport(){
    this.navCtrl.push('ItemSupportPage');
  }

  removeUserStore(){
    this.storage.get('account').then((data) => {
      this.storage.set('account', null);
      this.showUser = false;
    })
  }

  ionViewWillEnter(){
    this.checkUserLogin();
  }

  ionViewWillLeave(){
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')){
        this.statusBar.overlaysWebView(true);
        this.statusBar.backgroundColorByHexString("#000000");
        console.log('me leave statusbar');
      }
    })
  }


}
