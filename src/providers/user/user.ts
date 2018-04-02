// import { HTTP } from '@ionic-native/http';
import { Http, Response, /*RequestOptions,*/ Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class UserProvider {
  endpoint: string = '/api';
  user:boolean = null;
  userInfor;
  
  constructor(
    public httpClient: HttpClient,
    public http: Http,
    public platform: Platform,
    public storage: Storage,
  ) {
    if (platform.is('cordova')) this.endpoint = 'https://suplo-fashion.myharavan.com';
    this.checkUser();
  }

  checkUser() {
    return this.storage.ready().then(() => 
    this.storage.get('account').then((account) => 
    {
      if (account) {
        this.user = true;
        console.log('from memory: user logged')
        return account;
      }
      else {
        this.user = false;
        console.log('from memory: user not login yet!')
        return false
      }
    }))
  }

  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  userDataView(){
    return this.storage.ready().then(() =>
      this.storage.get('account').then((data) => {
        return data;
      })
    )
  }

  userState(state) {
    this.user = state;
    this.storage.set('account',this.user)
  }

  saveUsername(userinfor) {
    console.log('set user');
    this.storage.set('account',userinfor);
  }

  getUserData(){
    console.log('getUserData type json: https://suplo-fashion.myharavan.com/account?view=app.json');
    return this.httpClient.get(`https://suplo-fashion.myharavan.com/account?view=app.json`)
  }

  getUserDataTest(): Observable<User>{
    let user$ = this.http.get(`https://suplo-fashion.myharavan.com/account?view=app.json`)
    .map(mapUser)
    .catch(handleError);
    console.log('type json test:', user$);
    return user$;
  }

  getOrderDetail(handle:string){
    return this.httpClient.get(`https://suplo-fashion.myharavan.com${handle}?view=app.json`);
  }

  // lay address tu file json
  getAddressJson(): Observable<Address[]>{
    let address$ = this.http
      .get(`assets/data/address.json`)
      .map(mapAddress)
      .catch(handleError);
      return address$;
  }

}

function mapUser(response:Response): User {
  return toUser(response.json().data.account);
}

function toUser(r:any): User {
  let User = <User>({
    name: r.name,
    email: r.email,
    phone: r.phone,
    birthday: r.birthday,
    address: r.address,
    province: r.province,
    city: r.city,
    gender: r.gender,
    orders: r.orders,
    addresses: r.addresses
  });
  console.log('func User',User);
  console.log('func r',r);
  return User;
}

function mapAddress(response:Response): Address[]{
  return response.json().shipping_zones.map(toAddress);
}

function toAddress(r:any): Address{
  let Address = <Address>({
    id: r.id,
    province_code: r.province_code,
    name: r.name,
    districts: r.districts
  });
  return Address;
}

export interface User {
	name: string;
	email: string;
  phone: string;
  birthday: string;
  address: string;
  province: string;
  city: string;
  gender: string;
  orders: any[];
  addresses: any[]
}

export interface Address {
  id: number;
  province_code: string;
  name: string;
  districts: any[]
}

// this could also be a private method of the component class
function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Kết nối dữ liệu không thành công! Vui lòng thử lại.`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
