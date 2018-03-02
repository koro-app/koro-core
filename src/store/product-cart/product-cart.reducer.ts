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

export function pushSelectedAllItem(entities:any,ids:string[],value:boolean) {
  for (let i = 0; i <= ids.length - 1; i++) {
    entities[ids[i]].selected = value
  }
  return {...entities}
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

    // SET NEW CART
    case productCart.SELECTED: {
      return {
      ...state,
        entities: action.payload
      }
    }

    // SELECTED PRODUCT
    case productCart.SELECTED: {
      return {
     ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: {
            ...state.entities[action.payload.id],
            selected: action.value
          }
        }
      }
    }

    // SELECTED ALL PRODUCT
    case productCart.SELECTED_ALL: {
      let newEntities = pushSelectedAllItem(state.entities,state.ids,action.payload)
      return {
      ...state,
        entities: newEntities
      }
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

    // REMOVE ALL

    case productCart.REMOVE_ALL: {
      return {
        ...state,
         entities: {},
        ids:[]
      };
    }

    // DEFAULT
    default: {
      return state;
    }
  }
}