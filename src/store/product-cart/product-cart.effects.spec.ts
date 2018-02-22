import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import { EffectsRunner, EffectsTestingModule } from "@ngrx/effects/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Product CartEffects } from "./product-cart.effects";
import { Product CartService } from "./product-cart.service";
import { Observable } from "rxjs/Observable";

describe('Product CartEffects', () => {
  let runner, product-cartEffects, product-cartService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      Product CartEffects,
      {
        provide: Product CartService,
        useValue: jasmine.createSpyObj('product-cartService', ['get'])
      }
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    product-cartEffects = TestBed.get(Product CartEffects);
    product-cartService = TestBed.get(Product CartService);
  });

  describe('product-cart$', () => {

    it('should return a LOAD_SUCCESS action, on success', function () {

    });

    it('should return a LOAD_FAIL action, on error', function () {

    });

  });

});