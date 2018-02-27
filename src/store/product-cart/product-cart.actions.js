// GET PRODUCTS
export var GET_PRODUCTS = '[Product Cart] GetProducts';
export var GET_PRODUCTS_SUCCESS = '[Product Cart] GetProducts Success';
export var GET_PRODUCTS_FAIL = '[Product Cart] GetProducts Fail';
var GetProductsAction = /** @class */ (function () {
    function GetProductsAction() {
        this.type = GET_PRODUCTS;
    }
    return GetProductsAction;
}());
export { GetProductsAction };
var GetProductsSuccessAction = /** @class */ (function () {
    function GetProductsSuccessAction(payload) {
        this.payload = payload;
        this.type = GET_PRODUCTS_SUCCESS;
    }
    return GetProductsSuccessAction;
}());
export { GetProductsSuccessAction };
var GetProductsFailAction = /** @class */ (function () {
    function GetProductsFailAction(payload) {
        this.payload = payload;
        this.type = GET_PRODUCTS_FAIL;
    }
    return GetProductsFailAction;
}());
export { GetProductsFailAction };
// ADD PRODUCT
export var ADD = '[Product Cart] Add';
export var ADD_SUCCESS = '[Product Cart] Add Success';
export var ADD_FAIL = '[Product Cart] Add Fail';
var AddAction = /** @class */ (function () {
    function AddAction(payload) {
        this.payload = payload;
        this.type = ADD;
    }
    return AddAction;
}());
export { AddAction };
var AddSuccessAction = /** @class */ (function () {
    function AddSuccessAction(payload) {
        this.payload = payload;
        this.type = ADD_SUCCESS;
    }
    return AddSuccessAction;
}());
export { AddSuccessAction };
var AddFailAction = /** @class */ (function () {
    function AddFailAction(payload) {
        this.payload = payload;
        this.type = ADD_FAIL;
    }
    return AddFailAction;
}());
export { AddFailAction };
// INCREASE PRODUCT
export var INCREASE = '[Product Cart] Increase';
export var INCREASE_SUCCESS = '[Product Cart] Increase Success';
export var INCREASE_FAIL = '[Product Cart] Increase Fail';
var IncreaseAction = /** @class */ (function () {
    function IncreaseAction(payload) {
        this.payload = payload;
        this.type = INCREASE;
    }
    return IncreaseAction;
}());
export { IncreaseAction };
var IncreaseSuccessAction = /** @class */ (function () {
    function IncreaseSuccessAction(payload) {
        this.payload = payload;
        this.type = INCREASE_SUCCESS;
    }
    return IncreaseSuccessAction;
}());
export { IncreaseSuccessAction };
var IncreaseFailAction = /** @class */ (function () {
    function IncreaseFailAction(payload) {
        this.payload = payload;
        this.type = INCREASE_FAIL;
    }
    return IncreaseFailAction;
}());
export { IncreaseFailAction };
// DECREASE PRODUCT
export var DECREASE = '[Product Cart] Decrease';
export var DECREASE_SUCCESS = '[Product Cart] Decrease Success';
export var DECREASE_FAIL = '[Product Cart] Decrease Fail';
var DecreaseAction = /** @class */ (function () {
    function DecreaseAction(payload) {
        this.payload = payload;
        this.type = DECREASE;
    }
    return DecreaseAction;
}());
export { DecreaseAction };
var DecreaseSuccessAction = /** @class */ (function () {
    function DecreaseSuccessAction(payload) {
        this.payload = payload;
        this.type = DECREASE_SUCCESS;
    }
    return DecreaseSuccessAction;
}());
export { DecreaseSuccessAction };
var DecreaseFailAction = /** @class */ (function () {
    function DecreaseFailAction(payload) {
        this.payload = payload;
        this.type = DECREASE_FAIL;
    }
    return DecreaseFailAction;
}());
export { DecreaseFailAction };
// REMOVE PRODUCT
export var REMOVE = '[Product Cart] Remove';
export var REMOVE_SUCCESS = '[Product Cart] Remove Success';
export var REMOVE_FAIL = '[Product Cart] Remove Fail';
var RemoveAction = /** @class */ (function () {
    function RemoveAction(payload) {
        this.payload = payload;
        this.type = REMOVE;
    }
    return RemoveAction;
}());
export { RemoveAction };
var RemoveSuccessAction = /** @class */ (function () {
    function RemoveSuccessAction(payload) {
        this.payload = payload;
        this.type = REMOVE_SUCCESS;
    }
    return RemoveSuccessAction;
}());
export { RemoveSuccessAction };
var RemoveFailAction = /** @class */ (function () {
    function RemoveFailAction(payload) {
        this.payload = payload;
        this.type = REMOVE_FAIL;
    }
    return RemoveFailAction;
}());
export { RemoveFailAction };
//# sourceMappingURL=product-cart.actions.js.map