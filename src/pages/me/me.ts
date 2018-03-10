import { Storage } from '@ionic/storage';
import { UserProvider } from './../../providers/user/user';
import { ItemProvider } from './../../providers/item/item';
import { Component, Renderer2, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {
  showToolbar:boolean = false;
  showUser:boolean = false;
  fromAccountLink:boolean = false;
  loader:Loading;
  browser;
  options = {
    statusbar: {
        color: '#000000'
    },
    toolbar: {
        height: 56,
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
  inforAccount = {
    "name": "",
    "email": "",
    "phone": null,
    "address": "",
    "province": "",
    "city": "",
    "birthday": "",
    "gender": "",
  };
  userData;
  cssVariable: string = `
  #header,
  #breadcrumb-wrapper,
  #footer,
  #mobile-bottom-navigation,
  #back-to-top,
  #NavDrawer,
  #CartDrawer,
  #cancel-back-to-home,
  #haravan-notification,
  #snowflakeContainer {
    display:none !important;
  }
  html,body{
    height: 100%;
    background: #fff;
    display: block !important;
  }`;
  constructor(
    public ref: ChangeDetectorRef,
    public navCtrl: NavController, 
    public platform: Platform,
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
        this.showUser = false;
        this.directWhenNotLogin();
      } else {
        this.showUser = true;
        this.userData = user;
        console.log('here check', this.showUser);
      }
    })
  }

  directWhenNotLogin(){
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() =>{
        this.browser = cordova.ThemeableBrowser.open('https://suplo-fashion.myharavan.com/account/login', '_blank', this.options);
        this.actionBrowser();
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
      if (data.url.endsWith('login/') || data.url.endsWith('login') || data.url.endsWith('register/') || data.url.endsWith('register')) {
        this.navCtrl.setRoot('HomePage');
        this.browser.close();
      }
    })
    .addEventListener('loadstart', (data) =>  {
      // this.browser.insertCSS({code: "body{display: none}"})
      // xu ly logout
      if (data.url.endsWith('myharavan.com/') || data.url.endsWith('myharavan.com')) {
        console.log('here close');
        this.browser.close();
      }
    })
    .addEventListener('loadstop', (data) =>  {
      // xu ly login, regis, account
      this.browser.insertCSS({code: this.cssVariable},
        () => {
          // this.browser.show(); 
          if (data.url.endsWith('account/') || data.url.endsWith('account')) {
            // name
            this.browser.executeScript({
              code: "document.getElementsByClassName('customer_name')[0].innerHTML"
            }, ((name) => {
              this.inforAccount.name = name[0];
            }))
            // email
            this.browser.executeScript({
              code: "document.getElementsByClassName('customer_email')[0].innerHTML"
            }, ((email) => {
              this.inforAccount.email = email[0];
            }))
            // phone
            this.browser.executeScript({
              code: "document.getElementsByClassName('default-address_phone')[0].innerHTML"
            }, ((phone) => {
              this.inforAccount.phone = phone[0];
            }))
            // address
            this.browser.executeScript({
              code: "document.getElementsByClassName('default-address_address1')[0].innerHTML"
            }, ((address) => {
              this.inforAccount.address = address[0];
            }))
            // province
            this.browser.executeScript({
              code: "document.getElementsByClassName('default-address_province_code')[0].innerHTML"
            }, ((province) => {
              this.inforAccount.province = province[0];
            }))
            // city
            this.browser.executeScript({
              code: "document.getElementsByClassName('default-address_city')[0].innerHTML"
            }, ((city) => {
              this.inforAccount.city = city[0];
            }))
            // birthday
            this.browser.executeScript({
              code: "document.getElementsByClassName('customer_birthday')[0].innerHTML"
            }, ((birthday) => {
              this.inforAccount.birthday = birthday[0];
            }))
            // gender
            this.browser.executeScript({
              code: "document.getElementsByClassName('customer_gender')[0].innerHTML"
            }, ((gender) => {
              this.inforAccount.gender = gender[0];
            }));
            this.userData = this.inforAccount;
            this.userStore();
            this.browser.close();
          }
        }
      )
      // /xu ly logout
      // if (data.url.endsWith('logout/') || data.url.endsWith('logout') || data.url.endsWith('myharavan.com/') || data.url.endsWith('myharavan.com')) {
      //   this.browser.close();
      // }
    })
    .addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
        console.error(e.message);
    })
    .addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
        console.log(e.message);
    });
  }

  userStore(){
    this.storage.get('account').then((data) => {
      this.storage.set('account', this.userData);
      this.showUser = true;
      console.log('here', this.showUser);
    });
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  showLoad() {
    this.loader = this.loadCtrl.create({content: 'Vui lòng đợi...'})
    this.loader.present();
  }

  logOut() {
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() =>{
        this.browser = cordova.ThemeableBrowser.open('https://suplo-fashion.myharavan.com/account/logout', '_blank', this.options);
        this.actionBrowser();
        this.navCtrl.setRoot('HomePage');
        this.removeUserStore();
      })
    }
    // this.showUser = false;
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

}
