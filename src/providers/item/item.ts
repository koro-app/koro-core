import { Platform, App } from 'ionic-angular';
import { HttpClient, } from '@angular/common/http';
import { Injectable} from '@angular/core';

@Injectable()
export class ItemProvider {
  endpoint: string = '/api';
  
  constructor(
    public http: HttpClient,
    public platform: Platform,
  ) {
    if (platform.is('cordova')) this.endpoint = 'https://suplo-food.myharavan.com';
  }

  getProducts(handle="all") {
    return this.http.get(`${this.endpoint}/collections/${handle}?view=suplo.json`)
  }

  getProduct(handle) {
    return this.http.get(`${this.endpoint}/products/${handle}.js`)
  }

  searchRange(collectionId,min,max) {
    if (collectionId) {
      return this.http.get(`${this.endpoint}/search?&q=filter=(((collectionid:product=${collectionId})&&(price:product>${min})&&(price:product<${max})))&view=suplo.json`)
    }
    return this.http.get(`${this.endpoint}/search?&q=filter=(((price:product>${min})&&(price:product<${max})))&view=suplo.json`)
  }

  searchString(string) {
    console.log(`${this.endpoint}/search?&q=filter=((title:product**${string}))&view=suplo.json`)
    return this.http.get(`${this.endpoint}/search?&q=filter=((title:product**${string}))&view=suplo.json`)
  }

}
