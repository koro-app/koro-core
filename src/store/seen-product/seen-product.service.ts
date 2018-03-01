import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SeenProductService {
  seenProduct:any;
  constructor(
    public storage: Storage
  ) { }

  add(product) : Observable<any> {
    this.seenProduct = {
      ...this.seenProduct,
      [product.id]: {
        ...product
      }
    }
    return Observable.from(this.checkPoint())
    .mergeMap(() =>Observable.of(product))
  }

  getAll() : Observable<any> {
    return Observable.from(
      this.storage.ready()
      .then(() => 
        this.storage.get('seenProduct')
        .then(value => {
          console.log('get all from memory',value)
          this.seenProduct = value;
          if (value) return value;
          return  {};
        })
      )
    )
  }

  checkPoint() {
    console.log('get check pointed')
    return this.storage.ready().then(() => this.storage.set('seenProduct',this.seenProduct))
  }

}