var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as productCart from './product-cart.actions';
export var initialState = {
    loading: false,
    entities: {},
    ids: []
};
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        // GET ALL PRODUCT
        case productCart.GET_PRODUCTS: {
            return __assign({}, state, { loading: true });
        }
        case productCart.GET_PRODUCTS_SUCCESS: {
            return __assign({}, state, { loading: false, entities: __assign({}, action.payload), ids: Object.keys(action.payload).map(function (key) { return action.payload[key].id; }) });
        }
        case productCart.GET_PRODUCTS_FAIL: {
            return __assign({}, state, { loading: false });
        }
        // ADD PRODUCT
        case productCart.ADD: {
            return __assign({}, state, { loading: true });
        }
        case productCart.ADD_SUCCESS: {
            return __assign({}, state, { loading: false, entities: __assign({}, state.entities, (_a = {}, _a[action.payload.id] = __assign({}, action.payload, { quantity: 1 }), _a)), ids: state.ids.concat([
                    action.payload.id
                ]) });
        }
        case productCart.ADD_FAIL: {
            return __assign({}, state, { loading: false });
        }
        // INCREASE PRODUCT
        case productCart.INCREASE: {
            return __assign({}, state, { loading: true });
        }
        case productCart.INCREASE_SUCCESS: {
            return __assign({}, state, { loading: false, entities: __assign({}, state.entities, (_b = {}, _b[action.payload.id] = __assign({}, state.entities[action.payload.id], { quantity: (+state.entities[action.payload.id].quantity) + 1 }), _b)) });
        }
        case productCart.INCREASE_FAIL: {
            return __assign({}, state, { loading: false });
        }
        // DECREASE
        case productCart.DECREASE: {
            return __assign({}, state, { loading: true });
        }
        case productCart.DECREASE_SUCCESS: {
            return __assign({}, state, { loading: false, entities: __assign({}, state.entities, (_c = {}, _c[action.payload.id] = __assign({}, state.entities[action.payload.id], { quantity: (+state.entities[action.payload.id].quantity) - 1 }), _c)) });
        }
        case productCart.DECREASE_FAIL: {
            return __assign({}, state, { loading: false });
        }
        // REMOVE
        case productCart.REMOVE: {
            return __assign({}, state, { loading: true });
        }
        case productCart.REMOVE_SUCCESS: {
            var _d = state.entities, _e = action.payload.id, deletedItem = _d[_e], rest = __rest(_d, [typeof _e === "symbol" ? _e : _e + ""]);
            return __assign({}, state, { loading: false, entities: rest, ids: state.ids.filter(function (id) {
                    return id != action.payload.id;
                }).slice() });
        }
        case productCart.REMOVE_FAIL: {
            return __assign({}, state, { loading: false });
        }
        // DEFAULT
        default: {
            return state;
        }
    }
    var _a, _b, _c;
}
//# sourceMappingURL=product-cart.reducer.js.map