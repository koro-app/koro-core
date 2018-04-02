import { Platform } from 'ionic-angular';
import { HttpClient, } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/take';

@Injectable()
export class ItemProvider {
  endpoint: string = '/api';
  
  constructor(
    public http: HttpClient,
    public platform: Platform,
    public storage: Storage
  ) {
    if (platform.is('cordova')) this.endpoint = 'https://suplo-fashion.myharavan.com';
    this.checkUpdateConfig();
  }

  // check update config
  checkUpdateConfig(){
    return this.storage.ready().then(() =>
      this.storage.get('_config').then((currentdata) => {
        if (currentdata) {
          this.getConfig()
          .subscribe((newdata:any) => {
            if(JSON.stringify(newdata)  !== JSON.stringify(currentdata) ){
              this.saveStoreConfig(newdata);
              console.log('update config');
              return newdata;
            }else{
              console.log('dont need update');
              return currentdata;
            }
          })
        }else{
          this.getConfig()
          .subscribe((newdata:any) => {
            this.saveStoreConfig(newdata);
            return newdata;
          })
        }
      })
    )
  }

  checkConfig(){
    return this.storage.ready().then(() =>
      this.storage.get('_config').then((data) => {
        if (data) {
          console.log('has config');
          return data;
        }else{
          console.log('no config');
          return false;
        }
      })
    )
  }

  saveStoreConfig(settings){
    this.storage.ready().then(() => {
      console.log('set config');
      this.storage.set('_config', settings);
    })
  }

  getConfig(){
    return this.http.get(`${this.endpoint}/?view=settings.app.json`)
  }

  getProducts(handle="all", sort="created-descending") {
    return this.http.get(`${this.endpoint}/collections/${handle}?sort_by=${sort}&view=app.json`)
  }

  getListCollection(){
    return this.http.get(`${this.endpoint}/collections/?view=app.json`);
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

  getProductsSortBy(handle, sort){
    return this.http.get(`${this.endpoint}/collections/${handle}?sort_by=${sort}&view=app.json`)
  }
  getProductsFilter(handle, filter){
    return this.http.get(`${this.endpoint}/collections/${handle}?price=${filter}&view=app.json`)
  }

  getPolicyPage(handle:string){
    return this.http.get(`${handle}?view=app.json`)
  }

  getSupportPage(handle:string){
    return this.http.get(`${handle}?view=app.json`)
  }

  searchRange(collectionId,min,max) {
    if (collectionId) {
      return this.http.get(`${this.endpoint}/search?q=filter=(((collectionid:product=${collectionId})&&(price:product>${min})&&(price:product<${max})))&view=app.json`)
      // q=filter=(((collectionid:product=1000774012)&&(price:product>0)&&(price:product<1500000)))&view=app.json
      // q=filter=(((collectionid:product=1000774012)&&(price:product>1500000)&&(price:product<max)))&view=app.json
      // return this.http.get(`${this.endpoint}/search?q=filter=(((collectionid:product=${collectionId})&&(price:product>${min})&&(price:product<${max})))&view=app.json`)
    }else{
      return this.http.get(`${this.endpoint}/search?q=filter=(((price:product>${min})&&(price:product<${max})))&view=app.json`)
    }
  }

  searchString(string) {
    console.log(`${this.endpoint}/search?&q=filter=((title:product**${string}))&view=app.json`);
    var par = encodeURIComponent(string);
    console.log(`${this.endpoint}/search?&q=filter=((title:product**${par}))&view=app.json`);
    return this.http.get(`${this.endpoint}/search?&q=filter=((title:product**${par}))&view=app.json`)
  }

  searchByCode(value: string) {
    return this.http.get(`${this.endpoint}/search?q=${value}&view=app.json`)
  }

}
