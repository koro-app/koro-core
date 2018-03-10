import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UserProvider {
  user:boolean = null;
  userInfor;
  
  constructor(
    public http: HttpClient,
    public platform: Platform,
    public storage: Storage,
  ) {
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

  userDataView(){
    return this.storage.ready().then(() =>
      this.storage.get('account')
    )
  }

  userState(state) {
    this.user = state;
    this.storage.set('account',this.user)
  }

  saveUsername(userinfor) {
    this.storage.set('account',userinfor);
  }

  getUserData(){
    return this.http.get(`https://suplo-fashion.myharavan.com/account?view=app.json`).subscribe((data) => {
      console.log('user',data);
      this.saveUsername(data['name']);
    });
  }

}
