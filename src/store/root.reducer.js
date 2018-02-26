import { reducer, initialState } from "./product-cart/product-cart.reducer";
export var INITIAL_APPLICATION_STATE = {
    cart: initialState,
};
export function getInitialState() {
    return INITIAL_APPLICATION_STATE;
}
export var reducers = {
    cart: reducer
};
//# sourceMappingURL=root.reducer.js.map