import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';
import { NgForm } from '@angular/forms';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ItemAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-account',
  templateUrl: 'item-account.html',
})
export class ItemAccountPage {
  showUser:boolean = false;
  userData = {
    "name": "nguyen test",
    "first_name": "test",
	  "last_name": "nguyen",
    "email": "binh.nguyenthi@haravan.com",
    "phone": "02328983843",
    "birthday": "",
    "address": "so 98989",
    "province_code": "HI",
    "city": "",
    "gender": "",
    "orders": [],
    "addresses": []
  };
  provinces;
  districts;
  private heroesUrl = 'https://suplo-fashion.myharavan.com/account/addresses/1012671620';  // URL to web API
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    private http: Http
  ) {
    this. getUserStorage();
    this.getAddress();
    // let path = `secure_bsid=64800c4795c13d7f5ef11a0b050c088d; _landing_page=%252F; _orig_referer=; shop_ref=; popupNewLetterStatus=closed; customer_digest=CfDJ8FyFPV59mBtNhmQGz0fYZt9zFg5UW4ms45jptuYjRdqLMvBviYIUUII4eTXub5-WgXOVUZpTJzLa5VUMduT_Lx9xyovSevUAIhgx_GAbtEHpytH9CY6hd3dVYwt-xYi-80vzW8KPV-eBMmJ5WfRF3_rojk6eI53b0R4bI7xZXmnb7sYf7YyvTX4U6VnN0_x2eCy1pTvBlQ-zPPsqWfdEeluF7xcZLXNx8T9eNpeAQdydrtJKgvlT0j2XkWhoXwThCkCtPPIjMZygOFO4h0gU1dGXVf4RDzOSWJAhqArRA0rzUGt0-d6rOH3DLnTXzgJ_5Q`;
    // let value ='cookie';
    // const d: Date = new Date();
    // d.setTime(d.getTime() + 10 * 24 * 60 * 60 * 1000);
    // const expires = `expires=${d.toUTCString()}`;
    // const cpath = path ? `; path=${path}` : '';
    // document.cookie = `${name}=${value}; ${expires}${cpath}`;
    // console.log('document.cookie',document.cookie);
  }

  getUserStorage(){
    this.userProvider.checkUser().then((user) => {
      if (user == false) {
      } else {
        console.log('user',user);
        this.showUser = true;
        this.userData = user;
      }
    })
  }

  sendData(value) {
    console.log('send');
    return this.http.post(this.heroesUrl, value) //replace url with the action attribute
    .map(result => result.json())
    .catch(e => e.status === 401 ? Observable.throw('Unauthorized') : e.json());
  }

  private getRequestOptions() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    });
  
    // return new RequestOptions({headers: headers});
  }

  showDistricts(event){

  }

  getAddress(){
    this.userProvider.getAddressJson().subscribe((provinces) => {
      this.provinces = provinces;
      // if (this.userData.province_code != "null" && this.userData.province_code != "") {
      //   this.districts = this.provinces[this.userData.province - 1].province_code;
      // }else{
      //   this.districts = [];
      // }
    },(err) => {
      console.log(err);
    })
  }

  ionViewDidLoad() {
  }

}
