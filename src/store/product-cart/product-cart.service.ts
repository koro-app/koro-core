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

  addCart(product) : Observable<any> {
    this.cart = {
      ...this.cart,
      [product.id]: {
        ...product,
        quantity: 1
      }
    }
    return Observable.from(this.checkPoint())
    .mergeMap(() =>Observable.of(product))
  }

  increaseCart(product) : Observable<any> {
    this.cart = {
      ...this.cart,
      [product.id]: {
        ...this.cart[product.id],
        quantity: (+this.cart[product.id].quantity)+1
      }
    }
    return Observable.from(this.checkPoint())
    .mergeMap(() =>Observable.of(product))
  }

  decreaseCart(product) : Observable<any> {
    this.cart = {
      ...this.cart,
      [product.id]: {
        ...this.cart[product.id],
        quantity: (+this.cart[product.id].quantity)-1
      }
    }
    return Observable.from(this.checkPoint())
    .mergeMap(() =>Observable.of(product))
  }

  removeCart(product) {
    let { [product.id]: deletedItem, ...rest } = this.cart;
    this.cart = rest;
    return Observable.from(this.checkPoint())
    .mergeMap(() =>Observable.of(product))
  }

  checkPoint() {
    // console.log('cart to save',this.cart)
    return this.storage.ready().then(() => this.storage.set('cart',this.cart))
  }


}