import { ActionReducerMap} from "@ngrx/store";
import { reducer, initialState } from "./product-cart/product-cart.reducer";


export const INITIAL_APPLICATION_STATE = {
    cart: initialState,
};

export function getInitialState() {
  return INITIAL_APPLICATION_STATE;
}

export const reducers: ActionReducerMap<any> = {
    cart: reducer
}


