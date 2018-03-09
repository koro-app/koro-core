import { UserProvider } from './../../providers/user/user';
import { ItemProvider } from './../../providers/item/item';
import { Component, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {
  showUserFrame:boolean = false;
  fromAccountLink:boolean = false;
  loader:Loading;
  brower;
  options: ThemeableBrowserOptions = {
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
  cssVariable: string = `
  #header,
  #breadcrumb-wrapper,
  #footer,
  #mobile-bottom-navigation,
  #back-to-top,
  #cancel-back-to-home {
    display:none;
  }`;
  jsVariable: string = `
  (function() { 
    console.log('hello world')
    var item = 'hello ';
    var data = 'world ';
    var name = document.querySelector("#customer_sidebar h2").innerHTML;
    return item + data + name
  })()
   
  ` 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userProvider: UserProvider,
    public renderer: Renderer2,
    public loadCtrl: LoadingController,
    public themeBrowser: ThemeableBrowser
  ) {
    // this.showLoad();
    // this.checkUserLogin();
    this.brower = this.themeBrowser.create('https://suplo-fashion.myharavan.com/account/login','_blank', this.options)
    // .insertCss({
    //   code: this.cssVariable
    // })
    this.brower.insertCss({
      code: this.cssVariable
    }, (() => console.log('insert done')))

    // this.brower.addEventListener('loadstop',
    // () =>  this.brower.insertCSS({code: this.cssVariable},
    //   () => {
    //     this.brower.show(); 
    //     this.brower.executeScript({code: this.jsVariable},value => console.log('added completed',value))
    //   })
    // )

    this.actionInBrowser();
  }


  newBrowser(){
    // if (this.platform.is('cordova')) {
    // this.platform.ready().then(() =>{
    //     let ref = cordova.ThemeableBrowser.open('https://suplo-food.myharavan.com/account?view=suplo', '_blank', options)
    //     .addEventListener('loadstart',
    //     (data:{type:string,url:string}) => {
    //       console.log('data',data)
    //       if(data.url.endsWith('https://suplo-food.myharavan.com/')) {
    //         ref.close();
    //         // ref = undefined;
    //         this.userState(false);
    //         console.log('push user back to home page then close then set undefined, why select not define?',this.navCtrl)
    //         this.events.publish('selectTabs',0);
    //         // this.navCtrl.setRoot('HomePage', { tabIndex: 0 })
    //       }
    //     })
    //     .addEventListener('loadstop',
    //     () =>  ref.insertCSS({code: this.cssVariable},
    //       () => {
    //         ref.show(); 
    //         loading.dismiss();
    //         ref.executeScript({code: this.jsVariable},value => console.log('added completed',value))
    //       })
    //     )
    //     .addEventListener('exit',
    //     () => this.events.publish('selectTabs',0))
    //     .addEventListener('backPressed',
    //     () => console.log('user press backed'))
    //   })
    // }


  }


// kiem tra su kien tren browser checkout
  actionInBrowser(){
    // this.brower.addEventListener('loadstop',
    // () =>  this.brower.insertCSS({code: this.cssVariable},
    //   () => {
    //     this.brower.show(); 
    //     this.brower.executeScript({code: this.jsVariable},value => console.log('added completed',value))
    //   })
    // )
    this.brower.on("loadstop").subscribe(data =>{

      this.brower.insertCss({
        code: this.cssVariable
      }, (() => {
        console.log('done!');
      }))

      // login success, redict to account page => get data interface
      if (data.url.endsWith('account/') || data.url.endsWith('account')) {
        this.brower.executeScript({
          code: "document.getElementById('page-wrapper').innerHTML"
        }, ((html) => {
          console.log('executeScript html',html[0]);
          this.inforAccount = html[0];
        }))
        console.log('find account');
        this.brower.hide();
        console.log('find account');
      }
    });
    this.brower.on("ThemeableBrowserError").subscribe(error =>{
      console.log(error);
      this.brower.close();
    });
    // dat hang thanh cong => xoa gio hang
    this.brower.on("closePressed").subscribe(data =>{
      console.log("closePressed :  " + data.url)
    });
    this.brower.on("loadfail").subscribe(error =>{
      console.log('loadfail',error);
      this.brower.close();
    });
    this.brower.on("unexpected").subscribe(error =>{
      console.log('unexpected',error);
      this.brower.close();
    });
    this.brower.on("undefined").subscribe(error =>{
      console.log('undefined',error);
      this.brower.close();
    });
    this.brower.on("ThemeableBrowserWarning").subscribe(error =>{
      console.log('ThemeableBrowserWarning',error);
    });
    this.brower.on("critical").subscribe(error =>{
      console.log('critical',error);
    });
  }


  showLoad() {
    this.loader = this.loadCtrl.create({content: 'Vui lòng đợi...'})
    this.loader.present();
  }

  checkUserLogin() {
    if (this.userProvider.user != null) this.checkLogic(this.userProvider.user)
    else this.userProvider.checkUser().then(user => this.checkLogic(user))
  }

  checkLogic(user) {
    if (user) {
      // go to account page
      this.showUserFrame = true;
      this.fromAccountLink = true;
    } else {
      // go to login page
      this.showUserFrame = false;
      this.fromAccountLink = false;
    }
  }

  accountLoad(event,iframe) {
    let location:string = iframe.contentWindow.location.href;
    switch (location) {
      // Direct access to Account Page
      case 'https://suplo-food.myharavan.com/account':
        this.userProvider.userState(true);
        this.frame(iframe)
        break;
      // // Direct access to Login Page
      // case 'https://suplo-food.myharavan.com/account/login':
      //   this.frame(iframe)
      //   break;
      // // redirected from Account Page
      // case 'https://suplo-food.myharavan.com/account/logout':
      //   this.frame(iframe)
      //   break;
      // redirect link, from account page, Force reload loginFrame
      case 'https://suplo-food.myharavan.com/':
        this.userProvider.userState(false);
        if (iframe) this.renderer.setStyle(iframe,'display','none');
        this.renderer.setAttribute(iframe,'src','https://suplo-food.myharavan.com/account/login');
        break;
      default:
        this.frame(iframe);
        break;
    }

  }

  frame(iframe) {
    let doc:Document =  iframe.contentWindow.document || iframe.contentDocument;
    let login:Element = doc.querySelector('input[value="Đăng nhập"]');
    let logout:Element = doc.getElementById('customer_logout_link');
    let username:Element = doc.getElementsByClassName('h5')[0];
    if (logout && username) {
      this.userProvider.saveUsername(username.innerHTML);
      //creating logout html element
      username.parentNode.insertBefore(logout,username.nextSibling);
      this.enableLoadingEventFrom(logout,iframe);
    } else {
      let loginBox = doc.getElementById('CustomerEmail');
      if (loginBox) loginBox.focus();
      this.enableLoadingEventFrom(login,iframe);
    }

    this.hiddenWebElement(doc);
  }

  enableLoadingEventFrom(element:Element,iframe) {
    if (element) {
      let elementListener = this.renderer.listen(element,'click',(event) =>{
        elementListener();
        this.loader = this.loadCtrl.create({
          content: 'Vui lòng đợi...'
        })
        this.loader.present();
        if (iframe) this.renderer.setStyle(iframe,'display','none');
      })
    }
    // then show iframe
    if (iframe) this.renderer.setStyle(iframe,'display','block');
    this.loader.dismissAll();
  }


  hiddenWebElement(doc) {
    if (doc) {
      this.renderer.setStyle(doc.getElementById('tai-khoan'),'padding-bottom','80px');
      this.renderer.setStyle(doc.getElementById('tai-khoan'),'padding-top','1px');
      this.renderer.setStyle(doc.getElementById('breadcrumb-wrapper'),'display','none')
      this.renderer.setStyle(doc.getElementById('header'),'display','none')
      this.renderer.setStyle(doc.getElementById('footer'),'display','none')
      this.renderer.setStyle(doc.getElementById('mobile-bottom-navigation'),'display','none')
      this.renderer.setStyle(doc.getElementById('back-to-top'),'display','none')
    }
  }
}
