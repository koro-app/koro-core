import * as seenProduct from './seen-product.actions';

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

export function pushLimitedArray(entities:any,ids:string[],item) {
  if (ids.length >= 10) {
    let { [ids.shift()]: deletedItem, ...rest } = entities; // pop
    return {...rest,[item.id]:item}
  }
  return {...entities,[item.id]:item}
}

export function reducer(state = initialState, action: seenProduct.Actions): State {
  switch (action.type) {
    case seenProduct.ADD_SEEN: {
      return {
        ...state,
        loading:true
      }
    }
    case seenProduct.ADD_SEEN_SUCCESS: {
      let limitEntities = pushLimitedArray(state.entities,state.ids,action.payload)
      return {
        ...state,
        loading:false,
        entities: limitEntities,
        ids: Object.keys(limitEntities).map(key => limitEntities[key].id)
      }
    }

    case seenProduct.ADD_SEEN_FAILED: {
      return {
        ...state,
        loading:false
      }
    }

    case seenProduct.GET_ALL: {
      return {
        ...state,
        loading:true
      }
    }
    case seenProduct.GET_ALL_SUCCESS: {
      return {
        ...state,
        loading:false,
        entities: action.payload,
        ids: Object.keys(action.payload).map(key => action.payload[key].id)
      }
    }

    case seenProduct.GET_ALL_FAILED: {
      return {
        ...state,
        loading:false
      }
    }

    default: {
      return state;
    }
  }
}