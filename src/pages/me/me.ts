import { UserProvider } from './../../providers/user/user';
import { ItemProvider } from './../../providers/item/item';
import { Component, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {
  showUserFrame:boolean = false;
  fromAccountLink:boolean = false;
  loader:Loading;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userProvider: UserProvider,
    public renderer: Renderer2,
    public loadCtrl: LoadingController
  ) {
    this.showLoad();
    this.checkUserLogin();
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
