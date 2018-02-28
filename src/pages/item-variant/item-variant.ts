import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as cartActions from '../../store/product-cart/product-cart.actions';

/**
 * Generated class for the ItemVariantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-variant',
  templateUrl: 'item-variant.html',
})
export class ItemVariantPage {
  options;
  variants;
  selectedIndex = 0;
  titleVariant;
  first1: boolean = true;
  indexOption = 0;
  titleOptionSelected;
  indexDetailStockIn = 0;
  indexDetailStockInFollow = 0;
  indexVariantStockIn = 0;
  // public listOptionStockOut = {
  // 	"OptionStockOut": []
  // };
  public listOptionStockOut = [];
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public store: Store<any>,
    public toastCtrl: ToastController,
  	) {
  	this.getFirstVariant();
  	this.emitVariant();
  	this.checkVariantStockIn();
  	this.checkDetail();
  	this.findVariantStockOut();
  	this.disableOption1StockOut();
	// this.selectedVariant(this.options[0],this.options[0].details[this.indexDetailStockIn],this.indexDetailStockIn);
  }

  // first
  findVariantStockOut(){
  	for(let i = 0; i <= this.variants.length-1; i++) {
	  let duplicate = false;
      if (this.variants[i].inventory_quantity <= 0) {
      	if (this.listOptionStockOut != null && this.listOptionStockOut != undefined && this.listOptionStockOut.length > 0) {
	      	for(let j = 0; j <= this.listOptionStockOut.length-1; j++) {
	      	  if (this.listOptionStockOut[j] == this.variants[i].option1) {
	      	  	duplicate = true;
	      	  	break;
	      	  }
	      	}
      	}
      	if (duplicate == false) {
  	  		this.listOptionStockOut.push(this.variants[i].option1);
      	}
      }else{
      	if (this.listOptionStockOut != null && this.listOptionStockOut != undefined && this.listOptionStockOut.length > 0) {
	      	for(let j = 0; j <= this.listOptionStockOut.length-1; j++) {
	      	  if (this.listOptionStockOut[j] == this.variants[i].option1) {
	      	  	this.listOptionStockOut.splice(this.variants[i].option1, 1);
	      	  }
	      	}
      	}
      }
    }
  }

  disableOption1StockOut(){
	let indexFirstOption1 = 0;
  	for (let z = 0; z <= this.options[0].details.length - 1; z++) {
  		if (this.listOptionStockOut != null && this.listOptionStockOut != undefined && this.listOptionStockOut.length > 0) {
	      	for(let j = 0; j <= this.listOptionStockOut.length-1; j++) {
	      	  if (this.listOptionStockOut[j] == this.options[0].details[z].name) {
	      	  	this.options[0].details[z].disabled = true;
	      	  }else{
	      	  	indexFirstOption1 = z;
	      	  }
	      	}
      	}
	}
	this.firstSelectedVariant(this.options[0].details[indexFirstOption1]);
  }

  firstSelectedVariant(detail){
  	let canFind1 = false;
  	for (let i = 0; i <= this.variants.length - 1; i++) {
	  if (this.variants[i].inventory_quantity > 0) {
	  	canFind1 = true;
	  	this.selectedIndex = i;
	  	this.options[0].selectedDetail = detail.name;
	  	break;
	  }
  	}
  	for (let i = 0; i <= this.variants.length - 1; i++) {
  	  console.log('detail.name',detail.name);
	  if (detail.name == this.variants[i].option1) {
	  	for (let j = 1; j <= this.options.length - 1; j++) {
  			for (let z = 0; z <= this.options[j].details.length - 1; z++) {
  				if(this.variants[i].inventory_quantity > 0 && this.options[j].details[z].name == this.variants[i].option2 || this.options[j].details[z].name == this.variants[i].option3){
  					this.options[j].selectedDetail = this.options[j].details[z].name;
		  			this.options[j].details[z].disabled = false;
		  			this.options[j].details[z].checked = true;
		  			this.titleOptionSelected = this.options[j].details[z].name;
		  			// console.log('canfind', canFind2);
  				}else{
		  			// console.log('canfind2', canFind2);
  					if (this.options[j].details[z].checked == false) {
  						this.options[j].details[z].disabled = true;
  					}
  					// if (this.options[j].details.length - 1 == z && canFind2 == false) {
  					// 	this.options[j].details[indexDetail2].disabled = false;
  					// }
		  		}
		  		console.log(this.options[j].details[z].name,this.options[j].details[z].disabled);
  			}
	  	}
	  }
  	}
  }

  addToCart(product) {
    this.store.select('cart','entities')
    .take(1)
    .subscribe((variants) => {
      let variant = this.getVariantByTitle(product,product.selectedVariant);
      if (variants[variant.id] == undefined || variants[variant.id].selectedVariant != variant.selectedVariant) {
        this.store.dispatch(new cartActions.AddAction(variant));
        this.presentToast(`Đã thêm ${product.title} loại ${variant.title}`);
      } else {
        this.store.dispatch(new cartActions.IncreaseAction(variant));
        this.presentToast(`Tăng 1 sản phẩm ${product.title} bản ${variant.title}`);
      }
    })
    
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  getFirstVariant(){
  	this.variants = this.navParams.get('variants');
  	this.options = this.navParams.get('options');
  }

  checkVariantStockIn(){
  	for (let i = 0; i <= this.variants.length - 1; i++) {
  	  if(this.variants[i].inventory_quantity > 0){
  	  	this.indexVariantStockIn = i;
	  	this.titleOptionSelected = this.variants[this.indexVariantStockIn].option2;
	  	console.log(this.indexVariantStockIn, this.variants[this.indexVariantStockIn].option2)
	  	break;
  	  }
  	}
  }

  selectedVariant(option,detail,num){
  	let canFind1 = false;
  	for (let i = 0; i <= this.variants.length - 1; i++) {
  	  // if(this.variants[i].inventory_quantity > 0){
  	  // 	this.indexVariantStockIn = i;
  	  // }
	  if (this.variants[i].inventory_quantity > 0 && (detail.name == this.variants[i].option1 || detail.name == this.variants[i].option2 || detail.name == this.variants[i].option3)) {
	  	canFind1 = true;
	  	this.selectedIndex = i;
	  	console.log('this.variants[i]',i,this.variants[i].inventory_quantity,this.variants[i].option1,this.selectedIndex);
	  	break;
	  }
	  // else if(canFind1 == false && i == this.variants.length - 1){
	  // 	this.selectedIndex = this.indexVariantStockIn;
	  // 	// this.titleOptionSelected = this.variants[this.indexVariantStockIn].option2;
	  // 	console.log('this.variants[i]',i,this.variants[i].inventory_quantity,this.variants[i].option1,this.selectedIndex,this.indexVariantStockIn);
	  // 	break;
	  // }
  	}
  	this.selectDetailFollow(option,detail);
  }

  checkDetail(){
  	// let indexFirstOption1 = 0;
  	for (let z = 0; z <= this.options[0].details.length - 1; z++) {
		if (this.titleOptionSelected == this.options[0].details[z].name) {
			this.indexDetailStockIn = z;
			console.log(this.indexDetailStockIn,this.options[0].details[z].name);
			break;
		}
	}
  	// this.firstSelectedVariant(this.options[0].details[this.indexDetailStockIn]);
  }

  selectDetailFollow(option,detail){
  	if (option.position-1 == 0) {
  		this.resetOptions();
  		let canFind2 = false;
  		let titleOption2 = detail.name;
	  	for (let i = 0; i <= this.variants.length - 1; i++) {
		  if (detail.name == this.variants[i].option1) {
		  	for (let j = 0; j <= this.options.length - 1; j++) {
		  		if (option.position-1 != j) {
		  			for (let z = 0; z <= this.options[j].details.length - 1; z++) {
		  				if(this.variants[i].inventory_quantity > 0 && this.options[j].details[z].name == this.variants[i].option2 || this.options[j].details[z].name == this.variants[i].option3){
				  			this.options[j].details[z].disabled = false;
				  			this.options[j].details[z].checked = true;
				  			this.titleOptionSelected = this.options[j].details[z].name;
				  			canFind2 = true;
				  			// console.log('canfind', canFind2);
		  				}else{
				  			// console.log('canfind2', canFind2);
		  					if (this.options[j].details[z].checked == false) {
		  						this.options[j].details[z].disabled = true;
		  					}
		  					// if (this.options[j].details.length - 1 == z && canFind2 == false) {
		  					// 	this.options[j].details[indexDetail2].disabled = false;
		  					// }
				  		}
		  			}
		  		}
		  	}

		  }
	  	}
  	}
  }

  resetOptions(){
  	for (let j = 0; j <= this.options.length - 1; j++) {
		for (let z = 1; z <= this.options[j].details.length - 1; z++) {
			this.options[j].details[z].disabled = false;
			this.options[j].details[z].checked = false;
		}
  	}
  }

  selectedDetail(option,detail,num) {
  	this.first1 = false;
    this.options[option.position-1].selectedDetail = detail.name;
    this.emitVariant();
    this.selectedVariant(option,detail,num);
  }

  emitVariant() {
    this.titleVariant = this.options
    .map(option => option.selectedDetail)
    .join(' / ');
  }

  getVariantByTitle(product,title) {
    let variant = product.variants.filter(variant => variant.title == title)[0];
    //setup default featured image
    variant['default_featured_image'] = product.featured_image;
    // setup product title
    variant['productTitle'] = product.title;
    return variant;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ItemVariantPage');
  }

}
