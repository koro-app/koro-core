import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UserProvider {
  user:boolean = null;
  
  constructor(
    public http: HttpClient,
    public platform: Platform,
    public storage: Storage,
  ) {
    this.checkUser();
  }

  checkUser() {
    return this.storage.ready().then(() => 
    this.storage.get('user').then((user) => 
    {
      if (user) {
        this.user = true;
        console.log('from memory: user logged')
        return user;
      }
      else {
        this.user = false;
        console.log('from memory: user not login yet!')
        return false
      }
    }))
  }

  userState(state) {
    this.user = state;
    this.storage.set('user',this.user)
  }

  saveUsername(username) {
    this.storage.set('username',username)
  }

}
