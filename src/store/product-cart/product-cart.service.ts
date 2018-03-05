import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class ProductCartService {
  cart:any = {};

  constructor(
    public storage: Storage,
  ) { }

  getAll() {
    return Observable.from(this.storage.ready()
        .then(() => this.storage.get('cart').then(value => {
        // return this.storage.set('cart',{})
        this.cart = value;
        if (value) return value;
        return  {};
      }))
    )
  }

  addCart(product, quantity:number) : Observable<any> {
    console.log('quantity', quantity);
    this.cart = {
      ...this.cart,
      [product.id]: {
        ...product,
        quantity: quantity
      }
    }
    return Observable.from(this.checkPoint())
    .mergeMap(() =>Observable.of({product,quantity}))
  }

  increaseCart(product, quantity:number) : Observable<any> {
    this.cart = {
      ...this.cart,
      [product.id]: {
        ...this.cart[product.id],
        quantity: (+this.cart[product.id].quantity)+(+quantity)
      }
    }
    return Observable.from(this.checkPoint())
    .mergeMap(() =>Observable.of({product,quantity}))
  }

  decreaseCart(product, quantity:number) : Observable<any> {
    this.cart = {
      ...this.cart,
      [product.id]: {
        ...this.cart[product.id],
        quantity: (+this.cart[product.id].quantity)-(+quantity)
      }
    }
    return Observable.from(this.checkPoint())
    .mergeMap(() =>Observable.of({product,quantity}))
  }

  removeCart(product) {
    let { [product.id]: deletedItem, ...rest } = this.cart;
    this.cart = rest;
    return Observable.from(this.checkPoint())
    .mergeMap(() =>Observable.of(product))
  }

  removeAllCart(){
    this.cart = {};
    return Observable.from(this.checkPoint())
    .mergeMap(() =>Observable.of())
  }

  selectedItemCart(product) : Observable<any> {
    this.cart = {
      ...this.cart,
      [product.id]: {
        ...this.cart[product.id],
        selected: !this.cart[product.id].selected
      }
    }
    return Observable.from(this.checkPoint())
    .mergeMap(() =>Observable.of(product))
  }

  checkPoint() {
    // console.log('cart to save',this.cart)
    return this.storage.ready().then(() => this.storage.set('cart',this.cart))
  }


}