import { ActionReducerMap} from "@ngrx/store";
import { reducer as cartReducer, initialState as initalCart } from "./product-cart/product-cart.reducer";

import { reducer as seenProductReducer, initialState as initialSeenProduct } from "./seen-product/seen-product.reducer";

export const INITIAL_APPLICATION_STATE = {
    cart: initalCart,
    seenProduct: initialSeenProduct
};

export function getInitialState() {
  return INITIAL_APPLICATION_STATE;
}

export const reducers: ActionReducerMap<any> = {
    cart: cartReducer,
    seenProduct: seenProductReducer
}


