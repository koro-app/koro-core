import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ItemNewspaperPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-newspaper',
  templateUrl: 'item-newspaper.html',
})
export class ItemNewspaperPage {
  blogs;
  total_counts = 0;
  seenAll = false;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
    public loadingCtrl: LoadingController,
  	public itemProvider: ItemProvider,
  	private storage: Storage
    ) {
	this.getBlog();
  }

  getBlog(){
    let loading = this.startLoading();
  	this.itemProvider.getBlog().subscribe((data:any) => {
      this.blogs = data.articles;
      this.seenAll = true;
      //kiểm tra xem noti đã đọc
      this.blogs.forEach(item => {
        this.storage.get('articleseen').then((articleseen)=>{
          if(typeof articleseen !== "undefined" && articleseen !== null){
	          if(!articleseen.some(x => x === item.url)){
	            item.seen = false;
	            this.seenAll = false;
	          }else{
	            item.seen = true;
	          }
		      }
        })
      });
      loading.dismiss();
    });
  }

  startLoading() {
    // start loading
    let loading = this.loadingCtrl.create({
      content: 'Đang tải dữ liệu...'
    });
    loading.present();
    return loading;
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
      this.navCtrl.push('ItemNewspaperDetailPage', {
        url: article.url
      });
      this.storage.get('articleseen').then((articleseen)=>{
        if(typeof articleseen !== "undefined" && articleseen !== null){
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
    // console.log('ionViewDidLoad ItemNewspaperPage');
  }

}
