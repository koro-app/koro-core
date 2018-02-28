import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ItemNotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-notifications',
  templateUrl: 'item-notifications.html',
})
export class ItemNotificationsPage {
  blogs;
  total_counts = 0;
  seenAll = false;
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public itemProvider: ItemProvider,
  	private storage: Storage
  	) {
  	this.getBlog();
  }

  getBlog(){
  	this.itemProvider.getBlog().subscribe((data:any) => {
      this.blogs = data.articles;
      this.seenAll = true;
        this.blogs.forEach(item => {
          //kiểm tra xem noti đã đọc
          this.storage.get('articleseen').then((articleseen)=>{
            if(typeof articleseen !== "undefined" && articleseen !== null){
	          console.log(item.url, item.seen)
	          if(!articleseen.some(x => x === item.url)){
	            item.seen = false;
	            this.seenAll = false;
	          }else{
	            item.seen = true;
	          }
			}
          })
        });
    });
  }

  // doc tat ca
  readAll(){
    this.storage.get('articleseen').then((articleseen)=>{
      if(typeof articleseen !== "undefined" && articleseen !== null){
        this.seenAll = true;
        this.blogs.forEach(item => {
          //thêm biến kiểm tra xem item đã được chọn hay chưa
          if(!articleseen.some(x => x === item.url)){
            item.seen = true;
            articleseen.push(item.url);
          }
        });
        this.storage.set('articleseen', articleseen);
      }else{
        articleseen = [];
        this.seenAll = true;
        this.blogs.forEach(item => {
          item.seen = true;
          articleseen.push(item.url);
        });
        this.storage.set('articleseen', articleseen);
      }
    })
  }

  viewArticle(article){
  	article.seen = true;
    if(typeof article.url !== undefined && article.url !== ""){
      this.navCtrl.push('ItemNotificationsDetailPage', {
        url: article.url
      });
      this.storage.get('articleseen').then((articleseen)=>{
        if(typeof articleseen !== "undefined" && articleseen !== null){
          console.log(articleseen.some(x => x === article.url))
          if(!articleseen.some(x => x === article.url)){
            articleseen.push(article.url);
            this.storage.set('articleseen', articleseen);
          };
        }else{
          articleseen = [];
          articleseen.push(article.url);
          this.storage.set('articleseen', articleseen);
        }
        var count = this.total_counts - articleseen.length;
        if(count < 0){
          count = 0;
        }
      })
    }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ItemNotificationsPage');
  }

}
