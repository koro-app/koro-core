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
    if (platform.is('cordova')) this.endpoint = 'https://suplo-fashion.myharavan.com';
  }

  getConfig(){
    return this.http.get(`${this.endpoint}/?view=settings.app.json`)
  }

  getProducts(handle="all") {
    return this.http.get(`${this.endpoint}/collections/${handle}?view=app.json`)
  }

  getProduct(handle) {
    // return this.http.get(`${this.endpoint}/products/${handle}.js`)
    return this.http.get(`${this.endpoint}/products/${handle}?view=app.json`)
  }

  getBlog() {
    // return this.http.get(`${this.endpoint}/products/${handle}.js`)
    return this.http.get(`${this.endpoint}/blogs/news/?view=app.json`)
    /*
      return {
        paginate{
          pages
          items
          current_page
          hasNext
        }
        articles[
          {
            url
            seen 
            title
            published_at
            commentCount
            image
          }
        ]
      }
    */
  }

  getArticle(handle) {
    // return this.http.get(`${this.endpoint}/products/${handle}.js`)
    return this.http.get(`${this.endpoint}${handle}?view=app.json`)
    /*
      return {
        title
        content
        published_at
        number_of_comments
        image
      }
    */
  }

  searchRange(collectionId,min,max) {
    if (collectionId) {
      return this.http.get(`${this.endpoint}/search?&q=filter=(((collectionid:product=${collectionId})&&(price:product>${min})&&(price:product<${max})))&view=app.json`)
    }
    return this.http.get(`${this.endpoint}/search?&q=filter=(((price:product>${min})&&(price:product<${max})))&view=app.json`)
  }

  searchString(string) {
    console.log(`${this.endpoint}/search?&q=filter=((title:product**${string}))&view=app.json`)
    return this.http.get(`${this.endpoint}/search?&q=filter=((title:product**${string}))&view=app.json`)
  }
  searchByCode(value: string) {
    return this.http.get(`${this.endpoint}/search?q=${value}&view=app.json`)
  }

}
