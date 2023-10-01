import React from "react";
import CartContext from "./CartContext";

import { useReducer } from "react";

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const totalAmount_Updated =
      state.totalAmount + action.item.amount * action.item.price;

    let items_Updated_List;
    const AlreadeyExistItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    if (AlreadeyExistItemIndex != -1) {
      let item_update = {
        ...state.items[AlreadeyExistItemIndex],
        amount: state.items[AlreadeyExistItemIndex].amount + action.item.amount,
      };
      items_Updated_List = [...state.items];
      items_Updated_List[AlreadeyExistItemIndex] = item_update;
    } else {
      items_Updated_List = state.items.concat(action.item);
    }

    return {
      items: items_Updated_List,
      totalAmount: totalAmount_Updated,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    let items_Updated_List;
    const AlreadeyExistItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const totalAmount_Updated =
      state.totalAmount - state.items[AlreadeyExistItemIndex].price;
    if (state.items[AlreadeyExistItemIndex].amount === 1) {
      items_Updated_List = state.items.filter((item) => item.id !== action.id);
    } else {
      let item_update = {
        ...state.items[AlreadeyExistItemIndex],
        amount: state.items[AlreadeyExistItemIndex].amount - 1,
      };
      items_Updated_List = [...state.items];
      items_Updated_List[AlreadeyExistItemIndex] = item_update;
    }

    return {
      items: items_Updated_List,
      totalAmount: totalAmount_Updated,
    };
  }
  if (action.type === "CLEAR") {
    return {
      items: [],
      totalAmount: 0,
    };
  }

  return {
    items: [],
    totalAmount: 0,
  };
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });

  const cartContext = {
    items: cartState.items, // array of objects with product and quantity properties, e.g
    totalAmount: cartState.totalAmount,
    addItemToCart: (item) => {
      dispatchCart({ type: "ADD_ITEM", item: item });
    },
    removeItemFromCart: (id) => {
      dispatchCart({ type: "REMOVE_ITEM", id: id });
    },
    clearItemsInCart: () => {
      dispatchCart({ type: "CLEAR" });
    },
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
