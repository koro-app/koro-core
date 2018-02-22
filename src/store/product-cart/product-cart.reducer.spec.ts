import { reducer } from './product-cart.reducer';
import * as fromProductCart from './product-cart.reducer';

describe('Product CartReducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromProductCart.initialState);
    });
  });

});