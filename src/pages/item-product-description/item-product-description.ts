import { Component, Pipe } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { DomSanitizer, SafeUrl, SafeHtml, SafeStyle, SafeScript, SafeResourceUrl} from '@angular/platform-browser';


/**
 * Generated class for the ItemProductDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Pipe({
  name: 'safe'
})
export class SafePipe {

  constructor(protected _sanitizer: DomSanitizer) {
  }
  public transform(value: string, type: string = 'html'): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html': return this._sanitizer.bypassSecurityTrustHtml(value);
      case 'style': return this._sanitizer.bypassSecurityTrustStyle(value);
      case 'script': return this._sanitizer.bypassSecurityTrustScript(value);
      case 'url': return this._sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl': return this._sanitizer.bypassSecurityTrustResourceUrl(value);
      default: throw new Error(`Err: ${type}`);
    }
  }
}

@IonicPage()
@Component({
  selector: 'page-item-product-description',
  templateUrl: 'item-product-description.html',
})
export class ItemProductDescriptionPage {
  description: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController) {
      this.description = this.navParams.get('description')
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ItemProductDescriptionPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
