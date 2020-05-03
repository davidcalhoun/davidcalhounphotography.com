import { combineReducers } from "redux";
import { CART } from "../actions";

const initialCart = {
  items: []
};
const cart = (state = initialCart, action) => {
  const { type, photoCode, thumbnail, quantity } = action;

  switch (type) {
    case CART.ADD:
      return {
        ...state,
        items: [
          ...state.items,
          {
            photoCode,
            thumbnail,
            quantity
          }
        ]
      };
    case CART.REMOVE:
      return {
        ...state,
        items: [...state.items.filter(item => item.photoCode !== photoCode)]
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cart
});

export default rootReducer;
