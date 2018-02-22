import * as productCart from './product-cart.actions';

export interface State {
  loading: boolean;
  entities: { [id: string]: any };
  ids: string[];
}

export const initialState: State = {
  loading: false,
  entities: {},
  ids: []
}

export function reducer(state = initialState, action: productCart.Actions): State {
  switch (action.type) {
      // GET ALL PRODUCT
      case productCart.GET_PRODUCTS: {
        return {
          ...state,
          loading: true
        }
      }
  
      case productCart.GET_PRODUCTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          entities: {
            ...action.payload,
           
          },
          ids: Object.keys(action.payload).map(key =>action.payload[key].id)
        };
      }
  
       case productCart.GET_PRODUCTS_FAIL: {
        return {
          ...state,
          loading: false,
        };
      }

    // ADD PRODUCT
    case productCart.ADD: {
      return {
        ...state,
        loading: true
      }
    }

    case productCart.ADD_SUCCESS: {
      return {
        ...state,
        loading: false,
        entities: {
          ...state.entities,
          [action.payload.id]: {
            ...action.payload,
            quantity: 1
          }
        },
        ids: [
          ...state.ids,
          action.payload.id
        ]
      };
    }

     case productCart.ADD_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }

    // INCREASE PRODUCT
    case productCart.INCREASE: {
      return {
        ...state,
        loading: true
      }
    }

    case productCart.INCREASE_SUCCESS: {
      return {
        ...state,
        loading: false,
        entities: {
          ...state.entities,
          [action.payload.id]: {
            ...state.entities[action.payload.id],
            quantity: (+state.entities[action.payload.id].quantity)+1
          }
        }
       
      };
    }

     case productCart.INCREASE_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }

    // DECREASE

    case productCart.DECREASE: {
      return {
        ...state,
        loading: true
      }
    }

    case productCart.DECREASE_SUCCESS: {
      return {
        ...state,
        loading: false,
        entities: {
          ...state.entities,
          [action.payload.id]: {
            ...state.entities[action.payload.id],
            quantity: (+state.entities[action.payload.id].quantity)-1
          }
        }
       
      };
    }

     case productCart.DECREASE_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }

    // REMOVE

    case productCart.REMOVE: {
      return {
        ...state,
        loading: true
      }
    }

    case productCart.REMOVE_SUCCESS: {
      let { [action.payload.id]: deletedItem, ...rest } = state.entities;
      return {
        ...state,
        loading: false,
        entities: rest,
        ids: [...state.ids.filter((id) => {
          return id != action.payload.id;
        })]
      };
    }

     case productCart.REMOVE_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }

    // DEFAULT
    default: {
      return state;
    }
  }
}