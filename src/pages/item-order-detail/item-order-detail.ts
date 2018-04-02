import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, Loading } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';

/**
 * Generated class for the ItemOrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-order-detail',
  templateUrl: 'item-order-detail.html',
})
export class ItemOrderDetailPage {
  detailOrder;
  loader:Loading;
  browser;
  show:boolean = false;
  getData:boolean = true;
  options = {
    statusbar: {
        color: '#ffffff'
    },
    toolbar: {
        height: 44,
        color: '#ffffff'
    },
    title: {
        color: '#ffffff',
        staticText: ''
    },
    closeButton:{
      wwwImage: '',
      align: 'left',
      event: 'closePressed'
    },
    // hidden: "true",
    // clearcache: "true",
    // clearsessioncache: "true",
    backButtonCanClose: false
  };
  constructor(
  	public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public loadCtrl: LoadingController,
  	public userProvider: UserProvider
  	) {
      this.showLoad();
      // this.checkGetOrderDetail();
      this.getDetail();
  }

  showLoad() {
    this.loader = this.loadCtrl.create({content: 'Vui lòng đợi...'})
    this.loader.present();
    return this.loader;
  }

  checkGetOrderDetail() {
    // this.getData = this.navParams.get('getdata');
    // if(this.getData == true) {
      this.directBrowser();
    // }else{
      // this.userProvider.checkUser().then((user) => {
      //   this.distributeOrder(user.orders);
      //   this.loader.dismiss();
      // })
    // }
  }

  directBrowser(){
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() =>{
        this.browser = cordova.ThemeableBrowser.open('https://suplo-fashion.myharavan.com/account/', '_self', this.options);
        this.actionBrowser();
      })
    }
  }

  // kiem tra su kien tren browser
  actionBrowser(){
    this.browser.addEventListener('backPressed', function(e) {
    })
    .addEventListener('loadstart', (data) =>  {
      this.browser.insertCSS({code: "html,body{display: none}"})
      // lay data detail order
      this.getDetail();
      this.browser.close();
      this.loader.dismiss();
    })
    .addEventListener('loadstop', (data) =>  {
      // this.browser.close(); 
    })
    .addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
        console.error(e.message);
    })
    .addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
        console.log(e.message);
    });
  }

  getDetail(){
  	this.userProvider.getOrderDetail(this.navParams.get('url')).subscribe((data) => {
      this.detailOrder = data;
      this.show = true;
      this.loader.dismiss();
      // this.navCtrl.setRoot(this.navCtrl.getActive().component,{getdata:false});
    })
  }

  ionViewWillEnter(){
    
  }

  viewProduct(handle){
    this.navCtrl.push('ItemProductPage',{handle});
  }

  ionViewDidLoad() {
  }

}
