import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, Loading } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';

/**
 * Generated class for the ItemOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-orders',
  templateUrl: 'item-orders.html',
})
export class ItemOrdersPage {
  loader:Loading;
  browser;
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
  orders = [];
  financial: string = "";
  fulfillment: string = "";
  pageName = "";
  refund = "false";
  getData:boolean = true;
  constructor(
  	public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public loadCtrl: LoadingController,
  	public userProvider: UserProvider
  	) {
      this.showLoad();
      this.getTypeOrders();
      this.checkOrders();
      // this.checkUpdateOrder();
      // this.getDataOrders();
  }

  getTypeOrders(){
    if(this.navParams.get('getdata')){
      this.getData = this.navParams.get('getdata');
    }
    let typeOrder: string = this.navParams.get('order');
    if(typeOrder == "new"){
      this.pageName = "Đơn hàng mới";
      this.financial = "pending";
      this.fulfillment = "not fulfilled";
      this.refund = "false";
    }else if(typeOrder == "pending"){
      this.pageName = "Đơn hàng đang xử lý";
      this.financial = "pending";
      this.fulfillment = "not fulfilled";
      this.refund = "false";
    }else if(typeOrder == "done"){
      this.pageName = "Đơn hàng hoàn tất";
      this.financial = "paid";
      this.fulfillment = "fulfilled";
      this.refund = "false";
    }else if(typeOrder == "cancel"){
      this.pageName = "Đơn hàng đã hủy";
      this.financial = "refunded";
      this.fulfillment = "not fulfilled";
      this.refund = "true";
    }
  }

  showLoad() {
    this.loader = this.loadCtrl.create({content: 'Vui lòng đợi...'})
    this.loader.present();
  }

  checkOrders() {
    if(this.getData == true) {
      this.checkUpdateOrder();
    }else{
      this.userProvider.checkUser().then((user) => {
        this.distributeOrder(user.orders);
        this.loader.dismiss();
      })
    }
  }

  checkUpdateOrder(){
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() =>{
        this.browser = cordova.ThemeableBrowser.open('https://suplo-fashion.myharavan.com/account?view=app.style', '_blank', this.options);
        this.actionBrowser();
      })
    }
  }

  // kiem tra su kien tren browser
  actionBrowser(){
    this.browser.addEventListener('backPressed', function(e) {
    })
    .addEventListener('loadstart', (data) =>  {
      // this.browser.insertCSS({code: "html,body{display: none}"})
      // lay data order
      // this.userStore();
      // this.getDataOrders();
      // this.browser.close();
      // this.loader.dismiss();
    })
    .addEventListener('loadstop', (data) =>  {
      if (data.url.endsWith('account/') || data.url.endsWith('account') || data.url.endsWith('account?view=app.style')) {
        this.browser.executeScript({
          code: "document.getElementsByClassName('account_infor_app')[0].innerHTML"
        }, ((allinfor) => {
          let userData = JSON.parse(allinfor[0]);
          this.userProvider.saveUsername(userData);
          this.distributeOrder(userData.orders);
          this.loader.dismiss();
          // this.navCtrl.setRoot(this.navCtrl.getActive().component);
          this.browser.close();
        }));
      }
      // this.browser.close(); 
    })
    .addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
        console.error(e.message);
    })
    .addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
        console.log(e.message);
    });
  }

  userStore(){
    this.userProvider.getUserData().subscribe((data:any) => {
      this.userProvider.saveUsername(data);
      this.distributeOrder(data.orders);
      console.log('this.orders', this.orders);
      // this.navCtrl.setRoot(this.navCtrl.getActive().component,{getdata:false});
    })
  }

  distributeOrder(listorder){
    this.orders = [];
    for (var order in listorder) {
      var value = listorder[order];
      if(this.pageName == "Đơn hàng đang xử lý"){
        if (value.cancel_label == this.refund && (value.financial_status_label == this.financial || value.fulfillment_status_label == this.fulfillment)) {
          this.orders.push(value);
        }        
      }else if(this.pageName == "Đơn hàng đã hủy"){
        if (value.cancel_label == this.refund && value.financial_status_label == this.financial) {
          this.orders.push(value);
        }        
      }else{
        if (value.cancel_label == this.refund && value.financial_status_label == this.financial && value.fulfillment_status_label == this.fulfillment) {
          this.orders.push(value);
        }        
      }
    }
    this.getData = false;
  }

  viewDetailOrder(url){
    this.navCtrl.push('ItemOrderDetailPage',{url: url})
  }

  ionViewWillEnter(){
    // this.showLoad();
    // this.checkOrders();
    // this.checkUpdateOrder();
    console.log('enter order');
  }

  ionViewDidLoad() {
  }

}
